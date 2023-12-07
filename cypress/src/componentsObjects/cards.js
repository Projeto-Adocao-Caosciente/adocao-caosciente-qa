// Util
import { getValue, expected } from "@util/util";
import promisify from "cypress-promise";

class cards {
  constructor(locators) {
    this.locatorsCard = locators;
    this.size = 0;
  }

  /**
   * This method gets the size of elements in the list of cards (on the first displayed page). If the number of elements is equal to 0, then an assertion error is thrown, informing that the list of cards has no elements.
   * 
   * @returns {Promise<number>} - Returns the number of elements in the list of cards.
   */
  async getListSize() {
    this._checkExistenceList();
    let size = parseInt(await promisify(cy.getListSize(this.locatorsCard.cards)));

    return size;
  }

  /**
   * This method gets all headers from the list of cards, returning an array with all of them. It is important to say that the first and last elements are removed because they are empty in the DOM.
   * 
   * @returns {Promise<string[]>} - Returns an array with all headers from the list of cards.
   */
  async getCardHeaders() {
    await this._checkSizeList();
    let headers = ["name"];

    return headers;
  }

  /**
   * This method gets all the cards from a list of cards.
   * 
   * @returns {Promise<{}[]>} - Returns an array of objects with the values of the cards.
   */
  async getAllCards() {
    await this._checkSizeList();
    let cards = [];

    for (let i = 0; i < this.size; i++) {
      let cardObject = {};
      
      for (const key of Object.keys(this.locatorsCard.child(i).info)) {
        cardObject[key] = await promisify(cy.getText(this.locatorsCard.child(i).info[key]));
      }

      cards.push(cardObject);
    }

    return cards;
  }

  /**
   * This method gets a card from a list of cards. It is necessary to inform the index of the line that you want to obtain. Before trying to get the card, it is checked if the card actually exists in the DOM, if it doesn't exist, an assertion error is thcardn stating that the index of the desired card does not exist in the list of cards.
   * 
   * @param {number} card - Index of the card to be obtained.
   * @returns {Promise<{}>} - Returns an object with the values of the card.
   */
  async getCard(card) {
    this.size = await this.getListSize();
    this._checkExistenceCard(card);

    const cardObject = {};

    for (const key of Object.keys(this.locatorsCard.child(card).info)) {
      cardObject[key] = await promisify(cy.getText(this.locatorsCard.child(card).info[key]));
    }

    return cardObject;
  }

  /**
   * This method is responsible for checking the existence of the list of cards. If the list of cards does not exist, then an assertion error is thrown, informing that the list of cards does not exist or that there was an error loading it.
   */
  _checkExistenceList() {
    const customSuccessMessage = "[Lista de Cards] Os Cards foram carregados com sucesso.";
    const customFailureMessage = "[Lista de Cards] Não foi possível carregar os Cards.";

    cy.elementExpected(
      this.locatorsCard.cards,
      "should",
      "exist",
      customSuccessMessage,
      customFailureMessage
    );
  }

  _checkExistenceCard(cardIndex) {
    const customSuccessMessage = `[Lista de Cards] O Card '${cardIndex}' está disponível para ações.`;
    const customFailureMessage = `[Lista de Cards] Não foi possível realizar a ação no card '${cardIndex}', pois o mesmo não foi encontrada na lista.`;

    expected(
      this.size,
      "greaterThanOrEqual",
      cardIndex,
      customSuccessMessage,
      customFailureMessage
    );
  }

  /**
   * This method is responsible for checking the size of elements in the list of cards (on the first displayed page). If the number of elements is equal to 0, then an assertion error is thrown, informing that the list of cards has no elements.
   * @returns {Promise<void>}
   */
  async _checkSizeList() {
    this.size = await this.getListSize();

    const customSuccessMessage =
      `[Lista de Cards] A Lista possui '${this.size}' Cards.`;
    const customFailureMessage =
      "[Lista de Cards] Não foi possível obter os elementos da Lista de Cards.";

    expected(
      this.size,
      "not.equal",
      0,
      customSuccessMessage,
      customFailureMessage
    );
  }
}

export { cards };
