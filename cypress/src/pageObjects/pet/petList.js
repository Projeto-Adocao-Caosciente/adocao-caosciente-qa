// Locators & Routes
import { Routes } from "../../routes/routes";
import { locatorsPetList } from "../../locators/pages/pet/locatorsPetList";

// Data Transfer Objects
import { petDto } from "../../dto/pet/petDto";

// Components Objects
import { cards } from "../../componentsObjects/cards";

// Utils
import {
  getValue,
  expected,
  elementExpected,
  convertToDate,
} from "../../util/util";
import promisify from "cypress-promise";

class petList {
  constructor() {
    this.cards = new cards(locatorsPetList.list);
  }

  registerPet() {
    cy.get(locatorsPetList.actions.registerPet).click();
  }

  searchPet(name) {
    cy.get(locatorsPetList.actions.findPet).type(name);
  }

  async getAllPets() {
    return await this.cards.getAllCards();
  }

  async getPet(cardIndex) {
    return await this.cards.getCard(cardIndex);
  }

  viewPetDetails(cardIndex) {
    this._checkExistenceElementInList(cardIndex);
    cy.get(locatorsPetList.list.child(cardIndex).actions.viewDetails).click();
  }

  viewFormsAssociatedWithPet(cardIndex) {
    this._checkExistenceElementInList(cardIndex);
    cy.get(locatorsPetList.list.child(cardIndex).actions.viewForms).click();
  }

  editPet(cardIndex) {
    this._checkExistenceElementInList(cardIndex);
    cy.get(locatorsPetList.list.child(cardIndex).actions.edit).click();
  }

  /**
   * Checks if the desired element exists in the list.
   *
   * @param {string} element - CSS selector of the desired element.
   * @returns {void}
   */
  _checkExistenceElementInList(element) {
    const customSuccessMessage =
      "[Listagem de PETs] O PET desejado foi encontrado na Lista de Cards.";
    const customFailureMessage =
      "[Listagem de PETs] Não foi possível encontrar o PET desejado na Lista de Cards.";

    cy.elementExpected(
      element,
      "should",
      "visible",
      customSuccessMessage,
      customFailureMessage
    );
  }
}

export default new petList();
