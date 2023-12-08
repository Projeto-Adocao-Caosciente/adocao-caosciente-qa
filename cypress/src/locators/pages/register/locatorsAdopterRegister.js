const locatorsAdopterRegister = {
  name: '[data-selector="adopter-name-input"]',
  cpf: '[data-selector="adopter-cpf-input"]',
  birthDate: '[data-selector="adopter-birthdate-input"]',
  gender: {
    select: '[data-selector="adopter-gender-input"]',
    option: (child) => `ul[role="listbox"] li[value="${child}"]`,
  },
  email: '[data-selector="adopter-email-input"]',
  phoneNumber: '[data-selector="adopter-phone-input"]',
  address: '[data-selector="adopter-address-input"]',
  zipCode: '[data-selector="adopter-zipcode-input"]',
  city: '[data-selector="adopter-city-input"]',
  state: '[data-selector="adopter-state-input"]',
  password: '[data-selector="adopter-password-input"]',
  confirmPassword: '[data-selector="adopter-password-confirmation-input"]',

  navigation: {
    registerButton: '[data-selector="adopter-register-button"]',
    alreadyHaveAnAccount: '[data-selector="adopter-register-login-link"]',
  },
};

export { locatorsAdopterRegister };
