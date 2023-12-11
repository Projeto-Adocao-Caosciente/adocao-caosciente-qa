const locatorsPetDetails = {
  name: '[data-selector="pet-name-input"]',
  breed: '[data-selector="pet-breed-input"]',
  kind: '[data-selector="pet-kind-input"]',
  height: '[data-selector="pet-height-input"]',
  weight: '[data-selector="pet-weight-input"]',
  additionalInformation: '[data-selector="pet-additional-information-input"]',

  forms: {
    container: '[data-selector="form-container"]',

    form: (index) => `[data-selector="view-form"]:nth(${index})`,
    addForm: '[data-selector="form-add"]',

    emptyList: {
      message: '[data-selector="form-empty-list"]',
      button: '[data-selector="form-empty-list"] a',
    },

    error: {
      message: '[data-selector="form-error-list"]',
    }
  },

  navigation: {
    backButton: '[data-selector="pet-cancel-button"]',
  },
};

export { locatorsPetDetails };
