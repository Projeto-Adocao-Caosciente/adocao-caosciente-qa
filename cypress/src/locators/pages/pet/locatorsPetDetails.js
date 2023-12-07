const locatorsPetDetails = {
  name: 'input[name="name"]:last',
  breed: 'input[name="breed"]',
  kind: 'input[name="kind"]',
  height: 'input[name="height"]',
  weight: 'input[name="weight"]',
  additionalInformation: 'textarea[name="additionalInformation"]',

  forms: {
    container: '[data-selector="form-container"]',

    form: (index) => `[data-selector="form-pet-${index}"]`,
    addForm: '[data-selector="form-add-pet"]',

    emptyList: {
      message: '[data-selector="form-empty-list"]',
      button: '[data-selector="form-empty-list"] a',
    },
  },

  navigation: {
    backButton: "section:last button:last",
  },
};

export { locatorsPetDetails };
