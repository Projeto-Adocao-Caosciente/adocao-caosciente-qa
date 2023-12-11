// Locators Component Objects
import { locatorsFormQuestion } from "@locators/components/locatorsFormQuestion";
import { locatorsSendEmail } from "@locators/components/locatorsSendEmail";

const locatorsFormRegister = {
  titleForm: "[data-selector='form-title-input']",

  questions: (questionNumber) => {
    return locatorsFormQuestion(questionNumber);
  },

  addQuestionButton: "[data-selector='add-question-button']",

  sendEmail: locatorsSendEmail,

  navigation: {
    finishFormButton: "[data-selector='finish-form-button']",
    backButton: "[data-selector='cancel-form-button']",
  },
};

export { locatorsFormRegister };
