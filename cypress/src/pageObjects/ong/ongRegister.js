// Locators & Routes
import { Routes } from "../../routes/routes";
import { locatorsRegister } from "../../locators/pages/register/locatorsOngRegister";
import { locatorsToast } from "../../locators/components/locatorsToast";

// Data Transfer Objects
import { ongDto } from "../../dto/ong/ongDto";

// Components Objects

// Utils
import {
  getValue,
  expected,
  elementExpected,
  convertToDate,
} from "../../util/util";
import promisify from "cypress-promise";

class ongRegister {
  constructor() {}

  fillAllFields(uploadImage = false) {
    const ongData = new ongDto();

    if (uploadImage) {
      this.setProfilePhoto(ongData.getProfilePhoto());
    }

    this.fillNameField(ongData.getName());
    this.fillCnpjField(ongData.getCnpj());
    this.fillEmailField(ongData.getEmail());
    this.fillStateField(ongData.getState());
    this.fillCityField(ongData.getCity());
    this.fillPhoneNumberField(ongData.getPhoneNumber());
    this.fillProgramsAndActivitiesField(ongData.getProgramsAndActivities());
    this.fillMissionField(ongData.getMission());
    this.fillFoundationDateField(ongData.getFoundationDate());
    this.fillPasswordField(ongData.getPassword());
    this.fillConfirmPasswordField(ongData.getPassword());

    return ongData;
  }

  fillAllRequiredFields(uploadImage = false) {
    const ongData = new ongDto();

    if (uploadImage) {
      this.setProfilePhoto(ongData.getProfilePhoto());
    }

    this.fillNameField(ongData.getName());
    this.fillCnpjField(ongData.getCnpj());
    this.fillEmailField(ongData.getEmail());
    this.fillStateField(ongData.getState());
    this.fillCityField(ongData.getCity());
    this.fillPhoneNumberField(ongData.getPhoneNumber());
    this.fillFoundationDateField(ongData.getFoundationDate());
    this.fillPasswordField(ongData.getPassword());
    this.fillConfirmPasswordField(ongData.getPassword());

    return ongData;
  }

  setProfilePhoto(profilePhoto) {
    cy.get(locatorsOngRegister.profilePhoto).attachFile(profilePhoto);
  }

  fillNameField(name) {
    cy.get(locatorsOngRegister.name).type(name);
  }

  fillCnpjField(cnpj) {
    cy.get(locatorsOngRegister.cnpj).type(cnpj);
  }

  fillEmailField(email) {
    cy.get(locatorsOngRegister.email).type(email);
  }

  fillStateField(state) {
    cy.get(locatorsOngRegister.state).type(state);
  }

  fillCityField(city) {
    cy.get(locatorsOngRegister.city).type(city);
  }

  fillPhoneNumberField(phoneNumber) {
    cy.get(locatorsOngRegister.phoneNumber).type(phoneNumber);
  }

  fillProgramsAndActivitiesField(programsAndActivities) {
    cy.get(locatorsOngRegister.programsAndActivities).type(
      programsAndActivities
    );
  }

  fillMissionField(mission) {
    cy.get(locatorsOngRegister.mission).type(mission);
  }

  fillFoundationDateField(foundationDate) {
    cy.get(locatorsOngRegister.foundationDate).type(foundationDate);
  }

  fillPasswordField(password) {
    cy.get(locatorsOngRegister.password).type(password);
  }

  fillConfirmPasswordField(confirmPassword) {
    cy.get(locatorsOngRegister.confirmPassword).type(confirmPassword);
  }

  clickOnRegisterButton() {
    cy.get(locatorsRegister.navigation.registerButton).click();
  }

  registerOng() {
    cy.get(locatorsRegister.navigation.registerButton).click();

    this._checksIfRegisterIsConfirmed();
  }

  clickOnAlreadyHaveAnAccount() {
    cy.get(locatorsRegister.navigation.alreadyHaveAnAccount).click();
  }

  _checksIfRegisterIsConfirmed() {
    const customSuccessMessage =
      "[Cadastro - ONG] O Cadastro da ONG foi realizado com sucesso!";
    const customFailureMessage =
      "[Cadastro - ONG] Não foi possível realizar o Cadastro da ONG.";

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

export default new ongRegister();
