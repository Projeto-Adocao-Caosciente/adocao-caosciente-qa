// Locators Component Objects
import { locatorsFormQuestion } from "@locators/components/locatorsFormQuestion";
import { locatorsSendEmail } from "@locators/components/locatorsSendEmail";

const locatorsFormDetails = {
  titleForm: "[data-selector='form-title']",

  listOfQuestions: "[data-selector='question-form']",
  questions: (questionNumber) => {
    return locatorsFormQuestion(questionNumber);
  },

  sendEmail: {
    button: "[data-selector='send-email-button']",
    dialog: locatorsSendEmail,
  },

  navigation: {
    backButton: "[data-selector='cancel-form-button']",
  },
};

export { locatorsFormDetails };
