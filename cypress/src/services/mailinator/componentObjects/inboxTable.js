// Utils
import { getValue, getListSize } from "../util/getValue";
import { expected, elementExpected } from "../util/validate";
import promisify from "cypress-promise";

class inboxTable {
  constructor(locators) {
    this.locatorsTable = locators;
    this.size = 0;
  }

  /**
   * This method gets the size of elements in the table (on the first displayed page). If the number of elements is equal to 0, then an assertion error is thrown, informing that the table has no elements.
   * 
   * @returns {Promise<number>} - Returns the number of elements in the table.
   */
  async getTableSize() {
    this._checkExistenceTable();

    return parseInt(await promisify(getListSize(this.locatorsTable.tbody)));
  }

  /**
   * This method gets all headers from the table, returning an array with all of them. It is important to say that the first and last elements are removed because they are empty in the DOM.
   * 
   * @returns {Promise<string[]>} - Returns an array with all headers from the table.
   */
  async getTableHeaders() {
    await this._checkSizeTable();
    let sizeHeadersTable = parseInt(await promisify(getListSize(this.locatorsTable.thead)));
    sizeHeadersTable -= 2; // Remove the first and last element of the table (void)

    let headers = [];

    for (let i = 0; i < sizeHeadersTable; i++) {
      headers.push(await promisify(cy.getText(this.locatorsTable.header(i+2))));
    }

    return headers;
  }


  /**
   * This method gets all the rows from a table.
   * 
   * @returns {Promise<{}[]>} - Returns an array of objects with the values of the rows.
   */
  async getAllRows() {
    await this._checkSizeTable();
    const rows = [];

    for (let i = 0; i < this.size; i++) {
      const rowObject = {};
      
      for (const key of Object.keys(this.locatorsTable.child(i+1))) {
        rowObject[key] = await promisify(cy.getText(this.locatorsTable.child(i+1)[key]));
      }

      rows.push(rowObject);
    }

    return rows;
  }

  /**
   * This method gets a row from a table. It is necessary to inform the index of the line that you want to obtain. Before trying to get the row, it is checked if the row actually exists in the DOM, if it doesn't exist, an assertion error is thrown stating that the index of the desired row does not exist in the table.
   * 
   * @param {number} row - Index of the row to be obtained.
   * @returns {Promise<{}>} - Returns an object with the values of the row.
   */
  async getRow(row) {
    this.size = await this.getTableSize();
    this._checkExistenceRow(row);

    const rowObject = {};

    for (const key of Object.keys(this.locatorsTable.child(row))) {
      rowObject[key] = await promisify(cy.getText(this.locatorsTable.child(row)[key]));
    }

    return rowObject;
  }

  /**
   * This method is responsible for checking the existence of the table. If the table does not exist, then an assertion error is thrown, informing that the table does not exist or that there was an error loading it.
   */
  _checkExistenceTable(timeout = 20000) {
    const customSuccessMessage = "[Mailinator Inbox Table] A tabela de E-mails foi carregada com sucesso.";
    const customFailureMessage = "[Mailinator Inbox Table] Não existem E-mails à serem exibidos.";

    elementExpected(
      ".os-content > table > tbody > tr",
      "should",
      "exist",
      customSuccessMessage,
      customFailureMessage,
      timeout
    );
  }

  async _checkExistenceRow(row) {
    const customSuccessMessage = `[Mailinator Inbox Table] O E-mail da linha '${row}' está disponível para ações.`;
    const customFailureMessage = `[Mailinator Inbox Table] Não foi possível visualizar o E-mail da linha '${row}', pois o mesmo não foi recebido.`;

    await this._checkSizeTable();

    expected(
      this.size,
      "greaterThanOrEqual",
      row,
      customSuccessMessage,
      customFailureMessage
    );
  }

  /**
   * This method is responsible for checking the size of elements in the table (on the first displayed page). If the number of elements is equal to 0, then an assertion error is thrown, informing that the table has no elements.
   * @returns {Promise<void>}
   */
  async _checkSizeTable() {
    this.size = await this.getTableSize();

    const customSuccessMessage = `[Mailinator Inbox Table] A tabela possui '${this.size}' E-mails.`;
    const customFailureMessage = "[Mailinator Inbox Table] Não existem E-mails à serem exibidos.";

    expected(
      this.size,
      "not.equal",
      0,
      customSuccessMessage,
      customFailureMessage
    );
  }
}

export default { inboxTable };
