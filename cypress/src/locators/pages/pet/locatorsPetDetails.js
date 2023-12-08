const locatorsPetDetails = {
  name: '[data-selector="pet-name-input"]',
  breed: '[data-selector="pet-breed-input"]',
  kind: '[data-selector="pet-kind-input"]',
  height: '[data-selector="pet-height-input"]',
  weight: '[data-selector="pet-weight-input"]',
  additionalInformation: '[data-selector="pet-additional-information-input"]',

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
    backButton: '[data-selector="pet-cancel-button"]',
  },
};

export { locatorsPetDetails };
