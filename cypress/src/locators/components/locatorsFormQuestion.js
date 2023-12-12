const locatorsFormQuestion = (indexQuestion) => {
  const index = indexQuestion;
  const question = `[data-selector='question-form']:nth(${index})`

  return {
    card: question,
    questionTitle: `${question} [data-selector='question-title-input']`,

    listOfOptions: `${question} [data-selector='question-option']`,
    option: (indexOption) => {
      return {
        isCorrect: `${question} [data-selector='question-option-checkbox']:nth(${indexOption})`,
        optionDescription: `${question} [data-selector='question-option-input']:nth(${indexOption})`,
        deleteOption: `${question} [data-selector='question-option-remove-button']:nth(${indexOption})`,
      };
    },

    addOptionButton: `${question} [data-selector='question-add-option-button']`,

    navigation: {
      confirmQuestionButton: `${question} [data-selector='question-submit-button']`,
      removeQuestionButton: `${question} [data-selector='question-remove-button']`,
    },
  };
};

export { locatorsFormQuestion };
