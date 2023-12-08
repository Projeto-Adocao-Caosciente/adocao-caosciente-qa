const locatorsPetRegister = {
  profilePhotoInput: '[data-selector="pet-name-input"]',
  profilePhoto: '[data-selector="photo-input"]',
  name: '[data-selector="pet-name-input"]',
  name: '[data-selector="pet-name-input"]',
  breed: '[data-selector="pet-breed-input"]',
  kind: '[data-selector="pet-kind-input"]',
  height: '[data-selector="pet-height-input"]',
  weight: '[data-selector="pet-weight-input"]',
  specialNeeds: {
    select: '[data-selector="pet-special-needs-select"]',
    option: (child) => `ul[role="listbox"] li[value=${child}]`,
  },
  additionalInformation: '[data-selector="pet-additional-information-input"]',

  navigation: {
    registerButton: "[data-selector='pet-register-button']",
    cancel: "[data-selector='pet-cancel-button']",
  },
};

export { locatorsPetRegister };
