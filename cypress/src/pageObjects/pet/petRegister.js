// Locators & Routes
import { Routes } from "../../routes/routes";
import { locatorsPetRegister } from "../../locators/pages/pet/locatorsPetRegister";
import { locatorsToast } from "../../locators/components/locatorsToast";

// Data Transfer Objects
import { petDto } from "../../dto/pet/petDto";

// Components Objects

// Utils
import {
  getValue,
  expected,
  elementExpected,
  convertToDate,
} from "../../util/util";
import promisify from "cypress-promise";

class petRegister {
  constructor() {}

  teste() {
    const petData = new petDto();

    console.log(petData);
  }

  fillAllFields(uploadImage = false) {
    const petData = new petDto();

    if (uploadImage) {
      this.setProfilePhoto(petData.getProfilePhoto());
    }

    this.fillNameField(petData.getName());
    this.fillBreedField(petData.getBreed());
    this.fillKindField(petData.getKind());
    this.fillHeightField(petData.getHeight());
    this.fillWeightField(petData.getWeight());
    this.fillSpecialNeedsField(petData.getSpecialNeeds());
    this.fillAdditionalInformationField(petData.getAdditionalInformation());

    return petData;
  }

  fillAllRequiredFields(uploadImage = false) {
    const petData = new petDto();

    if (uploadImage) {
      this.setProfilePhoto(petData.getProfilePhoto());
    }

    this.fillNameField(petData.getName());
    this.fillBreedField(petData.getBreed());
    this.fillKindField(petData.getKind());
    this.fillHeightField(petData.getHeight());
    this.fillWeightField(petData.getWeight());

    return petData;
  }

  setProfilePhoto(profilePhoto) {
    cy.get(locatorsPetRegister.profilePhoto).attachFile(profilePhoto);
  }

  fillNameField(name) {
    cy.get(locatorsPetRegister.name).type(name);
  }

  fillBreedField(breed) {
    cy.get(locatorsPetRegister.breed).type(breed);
  }

  fillKindField(kind) {
    cy.get(locatorsPetRegister.kind).type(kind);
  }

  fillHeightField(height) {
    cy.get(locatorsPetRegister.height).type(height);
  }

  fillWeightField(weight) {
    cy.get(locatorsPetRegister.weight).type(weight);
  }

  fillSpecialNeedsField(specialNeeds) {
    cy.get(locatorsPetRegister.specialNeeds).type(specialNeeds);
  }

  fillAdditionalInformationField(additionalInformation) {
    cy.get(locatorsPetRegister.additionalInformation).type(additionalInformation);
  }

  clickOnRegisterButton() {
    cy.get(locatorsPetRegister.navigation.registerButton).click();
  }

  clickOnCancel() {
    cy.get(locatorsPetRegister.navigation.cancel).click();
  }

  registerPet() {
    cy.get(locatorsPetRegister.navigation.registerButton).click();

    this._checksIfRegisterIsConfirmed();
  }

  _checksIfRegisterIsConfirmed() {
    const customSuccessMessage =
      "[Cadastro - PET] O Cadastro do PET foi realizado com sucesso!";
    const customFailureMessage =
      "[Cadastro - PET] Não foi possível realizar o Cadastro do PET.";

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

export default new petRegister();
