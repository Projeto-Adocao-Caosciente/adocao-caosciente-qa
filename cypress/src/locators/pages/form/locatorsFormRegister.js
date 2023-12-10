import { locatorsFormQuestion } from "@locators/components/locatorsFormQuestion";

const locatorsFormRegister = {
  titleForm: "[data-selector='form-title-input']",

  questions: (questionNumber) => {
    return locatorsFormQuestion(questionNumber);
  },

  addQuestionButton: "[data-selector='add-question-button']",

  navigation: {
    finishFormButton: "[data-selector='finish-form-button']",
    backButton: "[data-selector='cancel-form-button']",
  },
};

export { locatorsFormRegister };
