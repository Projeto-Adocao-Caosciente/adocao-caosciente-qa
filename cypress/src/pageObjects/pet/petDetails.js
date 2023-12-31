// Locators & Routes
import { Routes } from "@routes/routes";
import { ApiRoutes } from "@routes/apiRoutes";
import { locatorsPetList } from "@locators/pages/pet/locatorsPetList";
import { locatorsPetDetails } from "@locators/pages/pet/locatorsPetDetails";

// Data Transfer Objects
import { petDto } from "@dto/pet/petDto";

// Components Objects

// Utils
import { getValue, expected, elementExpected, convertToDate } from "@util/util";
import promisify from "cypress-promise";

class petDetails {
  constructor() {}

  viewMockedFormList(formListMock) {
    const execute = {
      name: "click",
      command: locatorsPetList.list.child(0).actions.viewDetails,
    };

    cy.interceptRequest(formListMock, execute);
  }

  viewMockedPetDetails(petDetailsMock) {
    const execute = {
      name: "click",
      command: locatorsPetList.list.child(0).actions.viewDetails,
    };

    cy.interceptRequest(petDetailsMock, execute);
  }

  viewMockedFormDetails(formDetailsMock, indexForm) {
    const execute = {
      name: "click",
      command: locatorsPetDetails.forms.form(indexForm),
    };

    cy.interceptRequest(formDetailsMock, execute);
  }

  async getPetDetails() {
    const name = await promisify(cy.getValue(locatorsPetDetails.name));
    const breed = await promisify(cy.getValue(locatorsPetDetails.breed));
    const kind = await promisify(cy.getValue(locatorsPetDetails.kind));
    const height = await promisify(cy.getValue(locatorsPetDetails.height));
    const weight = await promisify(cy.getValue(locatorsPetDetails.weight));
    const additionalInformation = await promisify(
      cy.getValue(locatorsPetDetails.additionalInformation)
    );

    return new petDto({
      name: name,
      breed: breed,
      kind: kind,
      height: height,
      weight: weight,
      additionalInformation: additionalInformation,
    });
  }

  async getAllFormsAssociatedWithPet() {
    const listSizeOfForms = await promisify(cy.getListSize(locatorsPetDetails.forms.listOfForms));
    const nameOfForms = [];

    for (let index = 0; index < listSizeOfForms; index++) {
      const name = await promisify(cy.getText(locatorsPetDetails.forms.form(index)));
      nameOfForms.push(name);
    }

    return nameOfForms;
  }

  async getOneFormAssociatedWithPet(formIndex) {
    const name = await promisify(cy.getText(locatorsPetDetails.forms.form(formIndex)));

    return name;
  }

  async clickToViewFormDetails(index) {
    cy.intercept("GET", ApiRoutes.ong.pet.form.getOne).as("getOneForm");
    cy.get(locatorsPetDetails.forms.form(index)).click();
    await promisify(cy.wait("@getOneForm"));
  }

  clickCreateAdoptionFormButton() {
    cy.get(locatorsPetDetails.forms.addForm).click();
  }

  clickCreateAdoptionFormButtonWhenEmptyList() {
    cy.get(locatorsPetDetails.forms.emptyList.button).click();
  } 

  clickBackButton() {
    cy.get(locatorsPetDetails.navigation.backButton).click();
  }
}

export default new petDetails();
