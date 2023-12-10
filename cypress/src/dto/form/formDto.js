// Utils
import { faker } from "@faker-js/faker";

const randomNumber = Math.floor(Math.random() * 5) + 1;
const randomTemplateForm = require(`../../../fixtures/form/randomData/randomForm${randomNumber}.json`);

class formDto {
  constructor({ formTitle, questions } = {}) {
    this._formTitle = formTitle || randomTemplateForm.title;
    this._questions = questions || randomTemplateForm.questions;
  }

  getFormTitle() {
    return this._formTitle;
  }

  getQuestions() {
    return this._questions;
  }

  getQuestionTitle(questionNumber) {
    return this._questions[questionNumber].title;
  }

  getQuestionChoices(questionNumber) {
    return this._questions[questionNumber].choices;
  }

  setFormTitle(formTitle) {
    this._formTitle = formTitle;
  }

  setQuestions(questions) {
    this._questions = questions;
  }

  setQuestionTitle(questionNumber, questionTitle) {
    this._questions[questionNumber].title = questionTitle;
  }

  setQuestionChoices(questionNumber, questionChoices) {
    this._questions[questionNumber].choices = questionChoices;
  }
}

export { formDto };
