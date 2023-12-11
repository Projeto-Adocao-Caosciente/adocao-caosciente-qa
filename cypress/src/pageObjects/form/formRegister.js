// Locators & Routes
import { Routes } from "@routes/routes";
import { ApiRoutes } from "@routes/apiRoutes";
import { locatorsToast } from "@locators/components/locatorsToast";
import { locatorsFormDetails } from "@locators/pages/form/locatorsFormDetails";
import { locatorsFormRegister } from "@locators/pages/form/locatorsFormRegister";

// Data Transfer Objects
import { formDto } from "@dto/form/formDto";

// Components Objects
import { formQuestion } from "@componentsObjects/formQuestion";
import { sendEmail } from "@componentsObjects/sendEmail";

// Utils
import { getValue, expected, elementExpected, convertToDate } from "@util/util";
import promisify from "cypress-promise";

class formRegister {
  constructor() {
  }

  fillFormData(formData) {
    this.fillFormTitle(formData.getFormTitle());

    formData.getQuestions().forEach((question, indexQuestion) => {
      this.formQuestion = new formQuestion(indexQuestion, locatorsFormRegister.questions(indexQuestion));

      this.clickAddQuestionButton();
      this.fillQuestionData(question.question, question.choices);
      this.clickConfirmQuestionButton();
    });

    this.clickFinishFormButton();
    this.fillSendEmailDialog(formData.emailListOfAdoptersToBeSent);
  }

  fillFormTitle(formTitle) {
    cy.get(locatorsFormRegister.titleForm).type(formTitle);
  }

  fillQuestionData(questionTitle, listOfOptions) {
    this.formQuestion.fillQuestionData(questionTitle, listOfOptions);
  }

  fillSendEmailDialog(emailListOfAdoptersToBeSent) {
    this.sendEmail = new sendEmail(emailListOfAdoptersToBeSent, locatorsFormRegister.sendEmail);
    this.sendEmail.addManyRecipients();
  }

  clickConfirmQuestionButton() {
    this.formQuestion.clickConfirmQuestionButton();
  }

  clickAddQuestionButton() {
    cy.get(locatorsFormRegister.addQuestionButton).click();
  }

  clickFinishFormButton() {
    cy.intercept("POST", ApiRoutes.ong.pet.form.register).as("registerForm");
    cy.get(locatorsFormRegister.navigation.finishFormButton).click();
    cy.wait("@registerForm");

    this._checksIfFormWasCreatedSuccessfully();
  }

  clickBackButton() {
    cy.get(locatorsFormRegister.navigation.backButton).click();
  }

  _checksIfFormWasCreatedSuccessfully() {
    const customSuccessMessage = `[Formulário de Adoção] O formulário de adoção foi criado com sucesso.`;
    const customFailureMessage = `[Formulário de Adoção] Houve um problema ao tentar criar o formulário de adoção.`;

    cy.elementExpected(
      locatorsToast.success,
      "contains",
      "Formulário criado com sucesso!",
      customSuccessMessage,
      customFailureMessage,
    );
  }
}

export default new formRegister();
