// Locators & Routes
import { Routes } from "@routes/routes";
import { locatorsToast } from "@locators/components/locatorsToast";

// Util
import { getValue, expected } from "@util/util";
import promisify from "cypress-promise";

class formQuestion {
  constructor(questionNumber, locators) {
    this.questionNumber = questionNumber;
    this.locatorsFormQuestion = locators;
  }

  setQuestionNumber(questionNumber) {
    this.questionNumber = questionNumber;
  }

  fillQuestionData(questionTitle, listOfOptions) {
    this.fillQuestionTitle(questionTitle);

    listOfOptions.forEach((option, indexOption) => {
      if (indexOption !== 0) this.clickAddOptionButton();
      
      this.fillOptionDescription(indexOption, option.label);

      if (option.is_correct) this.checkOptionCorrect(indexOption);
    });
  }

  fillQuestionTitle(questionTitle) {
    cy.get(this.locatorsFormQuestion.questionTitle).type(questionTitle);
  }

  checkOptionCorrect(optionNumber) {
    cy.get(this.locatorsFormQuestion.option(optionNumber).isCorrect).click();
  }

  checkOptionUncorrect(optionNumber) {
    cy.get(this.locatorsFormQuestion.option(optionNumber).isCorrect).click();
  }

  fillOptionDescription(optionNumber, optionDescription) {
    cy.get(this.locatorsFormQuestion.option(optionNumber).optionDescription).type(optionDescription);
  }

  clickAddOptionButton() {
    cy.get(this.locatorsFormQuestion.addOptionButton).click();

    cy.getListSize(this.locatorsFormQuestion.listOfOptions).then((size) => {
      this._checksIfOptionWasAdded(size - 1);
    });
  }

  clickDeleteOption(optionNumber) {
    cy.get(this.locatorsFormQuestion.option(optionNumber).deleteOption).click();

    this._checksIfOptionWasRemoved(optionNumber);
  }

  clickDeleteQuestionButton() {
    cy.get(this.locatorsFormQuestion.navigation.removeQuestionButton).click();
  }

  clickConfirmQuestionButton() {
    cy.get(this.locatorsFormQuestion.navigation.confirmQuestionButton).click();

    this._checksIfQuestionWasAdded();
  }

  _checksIfOptionWasAdded(optionNumber) {
    const customSuccessMessage = `[Questão do Formulário] A opção ${optionNumber + 1} foi adicionada com sucesso à questão ${this.questionNumber + 1}.`;
    const customErrorMessage = `[Questão do Formulário] Houve um erro ao adicionar a opção ${optionNumber + 1} à questão ${this.questionNumber + 1}.`;

    cy.elementExpected(
      this.locatorsFormQuestion.option(optionNumber).optionDescription,
      "should",
      "exist",
      customSuccessMessage,
      customErrorMessage
    );
  }

  _checksIfOptionWasRemoved(optionNumber) {
    const customSuccessMessage = `[Questão do Formulário] A opção ${optionNumber + 1} foi removida com sucesso da questão ${this.questionNumber + 1}.`;
    const customErrorMessage = `[Questão do Formulário] Houve um erro ao remover a opção ${optionNumber + 1} da questão ${this.questionNumber + 1}.`;

    cy.elementExpected(
      this.locatorsFormQuestion.option(optionNumber).optionDescription,
      "should",
      "not.exist",
      customSuccessMessage,
      customErrorMessage
    );
  }

  _checksIfQuestionWasAdded() {
    const customSuccessMessage = `[Questão do Formulário] A questão ${this.questionNumber + 1} foi adicionada com sucesso ao formulário.`;
    const customErrorMessage = `[Questão do Formulário] Houve um erro ao adicionar a questão ${this.questionNumber + 1} ao formulário.`;

    cy.elementExpected(
      locatorsToast.success,
      "contains",
      "Pergunta adicionada",
      customSuccessMessage,
      customErrorMessage
    );
  }
}

export { formQuestion };
