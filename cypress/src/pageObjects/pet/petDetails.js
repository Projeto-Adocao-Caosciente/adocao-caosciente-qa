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

  viewMockedPetDetails(petDetailsMock) {
    const execute = {
      name: "click",
      command: locatorsPetList.list.child(0).actions.viewDetails,
    };

    cy.interceptRequest(petDetailsMock, execute);
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

  clickToViewFormDetails(index) {
    cy.get(locatorsPetDetails.forms.form(index)).click();
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
