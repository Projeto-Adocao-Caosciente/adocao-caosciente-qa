// Locators & Routes
import { Routes } from "../../routes/routes";
import { locatorsRegister } from "../../locators/pages/register/locatorsRegister";
import { locatorsToast } from "../../locators/components/locatorsToast";

// Data Transfer Objects
import { ongDto } from "../../dto/register/ongDto";

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
    cy.get(locatorsRegister.ong.profilePhoto).attachFile(profilePhoto);
  }

  fillNameField(name) {
    cy.get(locatorsRegister.ong.name).type(name);
  }

  fillCnpjField(cnpj) {
    cy.get(locatorsRegister.ong.cnpj).type(cnpj);
  }

  fillEmailField(email) {
    cy.get(locatorsRegister.ong.email).type(email);
  }

  fillStateField(state) {
    cy.get(locatorsRegister.ong.state).type(state);
  }

  fillCityField(city) {
    cy.get(locatorsRegister.ong.city).type(city);
  }

  fillPhoneNumberField(phoneNumber) {
    cy.get(locatorsRegister.ong.phoneNumber).type(phoneNumber);
  }

  fillProgramsAndActivitiesField(programsAndActivities) {
    cy.get(locatorsRegister.ong.programsAndActivities).type(
      programsAndActivities
    );
  }

  fillMissionField(mission) {
    cy.get(locatorsRegister.ong.mission).type(mission);
  }

  fillFoundationDateField(foundationDate) {
    cy.get(locatorsRegister.ong.foundationDate).type(foundationDate);
  }

  fillPasswordField(password) {
    cy.get(locatorsRegister.ong.password).type(password);
  }

  fillConfirmPasswordField(confirmPassword) {
    cy.get(locatorsRegister.ong.confirmPassword).type(confirmPassword);
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
