// Locators & Routes
import { Routes } from "@routes/routes";
import { locatorsPetRegister } from "@locators/pages/pet/locatorsPetRegister";
import { locatorsToast } from "@locators/components/locatorsToast";

// Data Transfer Objects
import { petDto } from "@dto/pet/petDto";

// Components Objects

// Utils
import {
  getValue,
  expected,
  elementExpected,
  convertToDate,
} from "@util/util";
import promisify from "cypress-promise";

class petRegister {
  constructor() {}

  fillAllFields(uploadImage = false) {
    const petData = new petDto();

    if (uploadImage) {
      this.setProfilePhoto(petData.getImage());
    }

    console.log(petData)

    this.fillNameField(petData.getName());
    this.fillBreedField(petData.getBreed());
    this.fillKindField(petData.getKind());
    this.fillHeightField(petData.getHeight());
    this.fillWeightField(petData.getWeight());
    this.selectSpecialNeedsField(petData.getSpecialNeeds());
    this.fillAdditionalInformationField(petData.getAdditionalInformation());

    return petData;
  }

  fillAllRequiredFields(uploadImage = false) {
    const petData = new petDto();

    if (uploadImage) {
      this.setProfilePhoto(petData.getImage());
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

  selectSpecialNeedsField(specialNeeds) {
    cy.get(locatorsPetRegister.specialNeeds.select).click();

    specialNeeds.forEach((specialNeed) => {
      cy.get(locatorsPetRegister.specialNeeds.option(specialNeed)).click();
    })
  }

  fillAdditionalInformationField(additionalInformation) {
    cy.get(locatorsPetRegister.additionalInformation).type(additionalInformation, { force: true });
  }

  clickOnRegisterButton() {
    cy.get(locatorsPetRegister.navigation.registerButton).click();
  }

  clickOnCancel() {
    cy.get(locatorsPetRegister.navigation.cancel).click();
  }

  registerPet(checksIfRegisterIsConfirmed = true) {
    this.clickOnRegisterButton();
    checksIfRegisterIsConfirmed ? this._checksIfRegisterIsConfirmed() : null;
  }

  _checksIfRegisterIsConfirmed() {
    const customSuccessMessage =
      "[Cadastro - PET] O Cadastro do PET foi realizado com sucesso!";
    const customFailureMessage =
      "[Cadastro - PET] Não foi possível realizar o Cadastro do PET.";

    cy.elementExpected(
      locatorsToast.success,
      "contains",
      "Cadastro efetuado com sucesso!",
      customSuccessMessage,
      customFailureMessage
    );
  }
}

export default new petRegister();
