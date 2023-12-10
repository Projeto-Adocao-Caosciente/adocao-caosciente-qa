// Locators & Routes
import { Routes } from "@routes/routes";
import { locatorsFormDetails } from "@locators/pages/form/locatorsFormDetails";
import { locatorsFormRegister } from "@locators/pages/form/locatorsFormRegister";

// Data Transfer Objects
import { formDto } from "@dto/form/formDto";

// Components Objects
import { formQuestion } from "@componentsObjects/formQuestion";

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
  }

  fillFormTitle(formTitle) {
    cy.get(locatorsFormRegister.titleForm).type(formTitle);
  }

  fillQuestionData(questionTitle, listOfOptions) {
    this.formQuestion.fillQuestionData(questionTitle, listOfOptions);
  }

  clickConfirmQuestionButton() {
    this.formQuestion.clickConfirmQuestionButton();
  }

  clickAddQuestionButton() {
    cy.get(locatorsFormRegister.addQuestionButton).click();
  }

  clickFinishFormButton() {
    cy.get(locatorsFormRegister.navigation.finishFormButton).click();
  }

  clickBackButton() {
    cy.get(locatorsFormRegister.navigation.backButton).click();
  }
}

export default new formRegister();
