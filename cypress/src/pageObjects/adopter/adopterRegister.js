// Locators & Routes
import { Routes } from "@routes/routes";
import { locatorsAdopterRegister } from "@locators/pages/register/locatorsAdopterRegister";
import { locatorsToast } from "@locators/components/locatorsToast";

// Components Objects

// Utils
import {
  getValue,
  expected,
  elementExpected,
  convertToDate,
} from "@util/util";
import promisify from "cypress-promise";

class adopterRegister {
  constructor() {}

  fillAllFields(adopterData) {
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

  fillAllRequiredFields(adopterData) {
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
    cy.get(locatorsAdopterRegister.gender.select).click();
    cy.get(locatorsAdopterRegister.gender.option(gender)).click();
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
    cy.get(locatorsAdopterRegister.navigation.registerButton).click();
  }

  registerAdopter(checksIfRegisterIsConfirmed = true) {
    cy.get(locatorsAdopterRegister.navigation.registerButton).click();

    checksIfRegisterIsConfirmed ? this._checksIfRegisterIsConfirmed() : null;
  }

  clickOnAlreadyHaveAnAccount() {
    cy.get(locatorsAdopterRegister.navigation.alreadyHaveAnAccount).click();
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
