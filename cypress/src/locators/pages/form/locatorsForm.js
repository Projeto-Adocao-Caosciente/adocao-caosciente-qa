import { locatorsQuestionForm } from "@locators/components/locatorsQuestionForm";

const locatorsForm = {
  titleForm: "[data-selector='form-title-input']",

  questions: {
    question: (index) => {
        return locatorsQuestionForm(index);
    },
    addQuestionButton: "[data-selector='add-question-button']",
  },

  navigation: {
    finishFormButton: "[data-selector='finish-form-button']",
    backButton: "[data-selector='cancel-form-button']",
  },
};

export { locatorsForm };
