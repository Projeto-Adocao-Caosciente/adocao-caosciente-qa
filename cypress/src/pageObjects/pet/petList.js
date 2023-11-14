// Locators & Routes
import { Routes } from "../../routes/routes";
import { locatorsPetList } from "../../locators/pages/pet/locatorsPetList";

// Data Transfer Objects
import { petDto } from "../../dto/pet/petDto";

// Components Objects
import { pagination } from "../../componentsObjects/pagination";
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
    this.pagination = new pagination();
    this.cards = new cards(locatorsPetList.list);
  }

  registerPet() {
    cy.get(locatorsPetList.actions.registerPet).click();
  }

  searchPet(name) {
    cy.get(locatorsPetList.actions.findPet).clear().type(name);
  }

  async getListSizeOfPets() {
    return await this.cards.getListSize();
  }

  async getAllPets() {
    return await this.cards.getAllCards();
  }

  async getPet(cardIndex) {
    return await this.cards.getCard(cardIndex);
  }

  viewPetDetails(cardIndex) {
    this._checkExistenceElementInList(locatorsPetList.list.card(cardIndex));
    cy.get(locatorsPetList.list.child(cardIndex).actions.viewDetails).click();
  }

  viewFormsAssociatedWithPet(cardIndex) {
    this._checkExistenceElementInList(locatorsPetList.list.card(cardIndex));
    this._checkIfRouteWasAcessedSuccessfully(Routes.pet.details);

    cy.get(locatorsPetList.list.child(cardIndex).actions.viewForms).click();
  }

  editPet(cardIndex) {
    this._checkExistenceElementInList(locatorsPetList.list.card(cardIndex));
    this._checkIfRouteWasAcessedSuccessfully(Routes.pet.edit);

    cy.get(locatorsPetList.list.child(cardIndex).actions.edit).click();
  }

  async getPetDetails() {
    // TODO: Fix this method
    this._checkIfRouteWasAcessedSuccessfully(Routes.pet.details);
    return null;
  }

  /**
   * This method is responsible for navigating through the pages of the table. It is necessary to inform the desired page (through the mockObject) and the command to be executed (click or reload).
   * Briefly, this method visit a first page, then click on the next page, then click on the next page, then click on the previous page and finally click on the previous page. In each step, it is checked whether the accessed page is the desired one.
   *
   * @param {object} mockObject - Mock Object with the desired page and the command to be executed.
   */
  viewAllMockPages(mockObject) {
    const execute = [
      {
        pageRequired: 1,
        name: "reload",
        command: "",
      },
    ];

    // View all mock pages (successor and predecessor)
    execute.forEach((element, index) => {
      this.pagination.goToMockPage(mockObject[index], element);
    });
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

  /**
   * Checks if the route accessed is the expected one, after clicking on a button.
   * 
   * @param {string} routeExpected - Expected route.
   */
  _checkIfRouteWasAcessedSuccessfully(routeExpected) {
    const customSuccessMessage = `[Detalhes de PET] A rota '${routeExpected}' foi acessada com sucesso.`;
    const customFailureMessage = `[Detalhes de PET] Houve um problema ao acessar a rota '${routeExpected}'.`;

    cy.url().then((routeObtained) => {
      cy.expected(
        routeObtained,
        "contains",
        routeExpected,
        customSuccessMessage,
        customFailureMessage
      );
    });
  }
}

export default new petList();
