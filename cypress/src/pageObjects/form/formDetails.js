// Locators & Routes
import { Routes } from "@routes/routes";
import { locatorsFormDetails } from "@locators/pages/form/locatorsFormDetails";

// Data Transfer Objects
import { formDto } from "@dto/form/formDto";

// Components Objects
import { sendEmail } from "@componentsObjects/sendEmail";

// Utils
import { getValue, expected, elementExpected, convertToDate } from "@util/util";
import promisify from "cypress-promise";

class formDetails {
  constructor() {}

  fillSendEmailDialog(emailListOfAdoptersToBeSent) {
    cy.get(locatorsFormDetails.sendEmail.button).click();

    this.sendEmail = new sendEmail(
      emailListOfAdoptersToBeSent,
      locatorsFormDetails.sendEmail.dialog,
      Routes.form
    );
    this.sendEmail.addManyRecipients();
  }

  async getFormDetails() {
    const formTitle = await this.getFormTitle();
    const formQuestions = await this.getFormQuestions();

    return new formDto({
      formTitle: formTitle,
      questions: formQuestions,
    });
  }

  async getFormTitle() {
    return await promisify(cy.getText(locatorsFormDetails.titleForm));
  }

  async getFormQuestions() {
    const numberOfQuestions = await promisify(cy.getListSize(locatorsFormDetails.listOfQuestions));
    let questions = [];

    for (let questionIndex = 0; questionIndex < numberOfQuestions; questionIndex++) {
      questions.push(await this.getFormQuestion(questionIndex));
    }

    return questions;    
  }

  async getFormQuestion(questionIndex) {
    const questionTitle = await this.getQuestionTitle(questionIndex);
    const questionChoices = await this.getAllChoicesOfQuestion(questionIndex);

    return {
      question: questionTitle,
      choices: questionChoices,
    };
  }

  async getQuestionTitle(questionIndex) {
    return await promisify(cy.getText(locatorsFormDetails.questions(questionIndex).questionTitle));
  }

  async getAllChoicesOfQuestion(questionIndex) {
    const numberOfQuestions = await promisify(cy.getListSize(locatorsFormDetails.questions(questionIndex).listOfOptions));
    let choices = [];

    for (let choiceIndex = 0; choiceIndex < numberOfQuestions; choiceIndex++) {
      choices.push(await this.getChoiceOfQuestion(questionIndex, choiceIndex));
    }

    return choices;
  }

  async getChoiceOfQuestion(questionIndex, choiceIndex) {
    const choiceIsCorrect = await this.getChoiceIsChecked(questionIndex, choiceIndex);
    const choiceDescription = await this.getChoiceDescription(questionIndex, choiceIndex);

    return {
      isCorrect: choiceIsCorrect,
      description: choiceDescription,
    };
  }

  async getChoiceIsChecked(questionIndex, choiceIndex) {
    return await promisify(cy.getCheckedValue(locatorsFormDetails.questions(questionIndex).option(choiceIndex).isCorrect));
  }

  async getChoiceDescription(questionIndex, choiceIndex) {
    return await promisify(cy.getInputValue(locatorsFormDetails.questions(questionIndex).option(choiceIndex).optionDescription));
  }

  clickToBackToPetDetails() {
    cy.get(locatorsFormDetails.navigation.backButton).click();
  }
}

export default new formDetails();
