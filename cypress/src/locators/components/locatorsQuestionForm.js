const locatorsQuestionForm = (indexQuestion) => {
  const index = indexQuestion - 1;

  return {
    questionTitle: `[data-selector='question-title-input']:nth(${index})`,

    option: {
      isCorrect: `[data-selector='question-option-checkbox']:nth(${index})`,
      optionDescription: `[data-selector='question-option-input']:nth(${index})`,
      deleteOption: `[data-selector='question-option-remove-button']:nth(${index})`,
    },

    addOptionButton: `[data-selector='question-add-option-button']:nth(${index})`,

    navigation: {
      addQuestionButton: `[data-selector='question-submit-button']`,
      removeQuestionButton: `[data-selector='question-remove-button']:nth(${index})`,
    },
  };
};

export { locatorsQuestionForm };
