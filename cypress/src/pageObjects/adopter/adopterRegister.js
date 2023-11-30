// Locators & Routes
import { Routes } from "../../routes/routes";
import { locatorsRegister } from "../../locators/pages/register/locatorsOngRegister";
import { locatorsToast } from "../../locators/components/locatorsToast";

// Data Transfer Objects
import { adopterDto } from "../../dto/adopter/adopterDto";

// Components Objects

// Utils
import {
  getValue,
  expected,
  elementExpected,
  convertToDate,
} from "../../util/util";
import promisify from "cypress-promise";

class adopterRegister {
  constructor() {}

  fillAllFields(uploadImage = false) {
    const adopterData = new adopterDto();

    if (uploadImage) {
      this.setProfilePhoto(adopterData.getProfilePhoto());
    }

    this.fillNameField(adopterData.getName());
    this.fillCpfField(adopterData.getCpf());
    this.fillBirthDateField(adopterData.getBirthDate());
    this.selectGender(adopterData.getGender());
    this.fillEmailField(adopterData.getEmail());
    this.fillPhoneNumberField(adopterData.getPhoneNumber());
    this.fillAddressField(adopterData.getAddress());
    this.fillZipCodeField(adopterData.getZipCode());
    this.fillCityField(adopterData.getCity());
    this.fillStateField(adopterData.getState());
    this.fillPasswordField(adopterData.getPassword());
    this.fillConfirmPasswordField(adopterData.getPassword());

    return adopterData;
  }

  fillAllRequiredFields(uploadImage = false) {
    const adopterData = new adopterDto();

    if (uploadImage) {
      this.setProfilePhoto(adopterData.getProfilePhoto());
    }

    this.fillNameField(adopterData.getName());
    this.fillCpfField(adopterData.getCpf());
    this.fillBirthDateField(adopterData.getBirthDate());
    this.selectGender(adopterData.getGender());
    this.fillEmailField(adopterData.getEmail());
    this.fillPhoneNumberField(adopterData.getPhoneNumber());
    this.fillAddressField(adopterData.getAddress());
    this.fillZipCodeField(adopterData.getZipCode());
    this.fillCityField(adopterData.getCity());
    this.fillStateField(adopterData.getState());
    this.fillPasswordField(adopterData.getPassword());
    this.fillConfirmPasswordField(adopterData.getPassword());

    return adopterData;
  }

  setProfilePhoto(profilePhoto) {
    cy.get(locatorsAdopterRegister.profilePhoto).attachFile(profilePhoto);
  }

  fillNameField(name) {
    cy.get(locatorsAdopterRegister.name).type(name);
  }

  fillCpfField(cpf) {
    cy.get(locatorsAdopterRegister.cpf).type(cpf);
  }

  fillBirthDateField(birthDate) {
    cy.get(locatorsAdopterRegister.birthDate).type(birthDate);
  }

  selectGender(gender) {
    cy.get(locatorsAdopterRegister.gender).type(gender);
  }

  fillEmailField(email) {
    cy.get(locatorsAdopterRegister.email).type(email);
  }

  fillPhoneNumberField(phoneNumber) {
    cy.get(locatorsAdopterRegister.phoneNumber).type(phoneNumber);
  }

  fillAddressField(address) {
    cy.get(locatorsAdopterRegister.address).type(address);
  }

  fillZipCodeField(zipCode) {
    cy.get(locatorsAdopterRegister.zipCode).type(zipCode);
  }

  fillCityField(city) {
    cy.get(locatorsAdopterRegister.city).type(city);
  }

  fillStateField(state) {
    cy.get(locatorsAdopterRegister.state).type(state);
  }

  fillPasswordField(password) {
    cy.get(locatorsAdopterRegister.password).type(password);
  }

  fillConfirmPasswordField(confirmPassword) {
    cy.get(locatorsAdopterRegister.confirmPassword).type(confirmPassword);
  }

  clickOnRegisterButton() {
    cy.get(locatorsRegister.navigation.registerButton).click();
  }

  registeradopter() {
    cy.get(locatorsRegister.navigation.registerButton).click();

    this._checksIfRegisterIsConfirmed();
  }

  clickOnAlreadyHaveAnAccount() {
    cy.get(locatorsRegister.navigation.alreadyHaveAnAccount).click();
  }

  _checksIfRegisterIsConfirmed() {
    const customSuccessMessage =
      "[Cadastro - Adotante] O Cadastro do Adotante foi realizado com sucesso!";
    const customFailureMessage =
      "[Cadastro - Adotante] Não foi possível realizar o Cadastro do Adotante.";

    cy.elementExpected(
      locatorsToast.success,
      "should",
      "exist",
      customSuccessMessage,
      customFailureMessage,
      20000
    );
  }
}

export default new adopterRegister();
