// Locators
import { locatorsInboxPaneMailinator, locatorsEmailPaneMailinator } from "./locatorsMailinator";

// Component Objects
import { inboxTable } from "./componentObjects/inboxTable";

// Utils
import promisify from "cypress-promise";

// Asserts of the Mailinator Service
import assertsMailinator from "./asserts/assertsMailinator";

const MAILINATOR_ROUTES = {
  baseUrl: "https://www.mailinator.com/v4/public/inboxes.jsp",
  emailUrl: "https://www.mailinator.com/v4/public/inboxes.jsp?to=",
};

class mailinatorService {
  constructor() {
    this.routes = MAILINATOR_ROUTES;
    this.locatorsInboxPane = locatorsInboxPaneMailinator;
    this.locatorsEmailPane = locatorsEmailPaneMailinator;
    this.inboxTable = new inboxTable(this.locatorsInboxPane.table);
  }

  /**
   * Visit the Mailinator Service URL. If the username parameter is informed, then the URL will be the inbox of the user, else the URL will be the main page.
   * 
   * @param {String} username Username of the user to be visited.
   * @returns {void}
   */
  visitMailinatorService(username = null) {
    if (!username) {
      cy.visit(this.routes.baseUrl);
      return;
    }

    cy.visit(`${this.routes.emailUrl}${username}`);
    this.inboxTable._checkExistenceTable();

    //cy.origin("https://www.mailinator.com/v4/public/inboxes.jsp", { args: serializable }, (serializable) => {
      //const titlei = Cypress.require('./locatorsMailinator.js')
      //console.log(titlei.locatorsInboxPaneMailinator.table.header(1));

      // solution
      //const FilePO = Cypress.require('../file.po')
      //const filePO = new FilePO()
    
      //cy.visit(`${batata.routes.emailUrl}${"teste"}`);
      //batata.inboxTable._checkExistenceTable(); 
    //});
  }

  /**
   * View the inbox of a specified user. After search inbox, it's checked if the table exists (if there are emails in the inbox).
   * 
   * @param {String} username Username of the user to be visited.
   * @returns {void}
   */
  viewPublicInbox(username) {
    cy.get(this.locatorsInboxPane.emailInbox).type(username);
    cy.get(this.locatorsInboxPane.commands.searchInbox).click();

    this.inboxTable._checkExistenceTable();
  }

  /**
   * This method get all emails presents in the inbox specifed in the username parameter.
   * 
   * @returns {Array<Object>} Array of objects with the values of the rows.
   */
  async getAllEmails() {
    return await this.inboxTable.getAllRows();
  }

  /**
   * This method gets an email present in the inbox of a specified user. It is necessary to inform the email index contained in the table.
   * 
   * @param {Number} indexEmail Index of the email in the table.
   * @returns {Object} Object with the values of the row.
   */
  async getOneEmail(indexEmail) {
    return await this.inboxTable.getRow(indexEmail);
  }
  
  /**
   * This method pauses the reception of emails in the inbox of a specified user.
   * 
   * @returns {void}
   */
  pauseReceivedEmails() {
    cy.get(this.locatorsInboxPane.commands.pauseReceivedEmails).click();

    assertsMailinator._checkHasBeenPaused();
  }

  /**
   * This method unpauses the reception of emails in the inbox of a specified user.
   * 
   * @returns {void}
   */
  unpauseReceivedEmails() {
    cy.get(this.locatorsInboxPane.commands.unpauseReceivedEmails).click();

    assertsMailinator._checkHasBeenUnpaused();
  }

  /**
   * This method deletes an email present in a user's inbox. 
   * The precondition is to be in a user's inbox. It is checked whether the email you want to delete actually exists in the inbox. 
   * If it exists, the email is deleted. It is necessary to inform the email index contained in the table.
   * 
   * @param {Number} indexEmail Index of the email in the table.
   * @returns {void}
   */
  async deleteOneEmail(indexEmail) {
    await this.inboxTable._checkExistenceRow(indexEmail);

    // Get a copy of the email to be deleted
    const emailDeleted = await this.getOneEmail(indexEmail);

    cy.get(this.locatorsInboxPane.table.child(indexEmail).check).check({ force: true });
    cy.get(this.locatorsInboxPane.commands.deleteEmail).click();

    // Get a copy of the email obtained after deletion
    const emailObtained = await this.getOneEmail(indexEmail);
    assertsMailinator._checkEmailHasBeenDeleted(emailDeleted, emailObtained);
  }

  /**
   * This method deletes many emails present in a user's inbox.
   * The precondition is to be in a user's inbox. It is checked whether the emails you want to delete actually exist in the inbox.
   * If they exist, the emails are deleted. It is necessary to inform the email indexes contained in the table.
   * 
   * @param {Array<Number>} emailsToBeDeleted Array of indexes of the emails in the table.
   * @returns {void}
   */
  async deleteManyEmails(emailsToBeDeleted) {
    let emailsDeleted = [];

    emailsToBeDeleted.forEach(async (index) => {
      await this.inboxTable._checkExistenceRow(index);

      // Get a copy of the email's to be deleted.
      emailsDeleted.push(await this.getOneEmail(index));
      cy.get(this.locatorsInboxPane.table.child(index).check).check({ force: true });
    });

    cy.get(this.locatorsInboxPane.commands.deleteEmail).click();

    // Get a copy of the email obtained after deletion
    const emailsObtained = await this.getAllEmails();
    assertsMailinator._checkEmailsHasBeenDeleted(emailsDeleted, emailsObtained);
  }

  /**
   * This method views the details of an email present in the inbox. 
   * The precondition is to be in a user's inbox. It is checked whether the email you want to view actually exists in the inbox. 
   * It is necessary to inform the email index contained in the table
   * 
   * @param {Number} indexEmail Index of the email in the table.
   * @returns {void}
   */
  async viewEmail(indexEmail) {
    await this.inboxTable._checkExistenceRow(indexEmail);

    cy.get(this.locatorsInboxPane.table.child(indexEmail).subject).click();
  }

  /**
   * This method displays the header details of an email. The precondition is to be on the email details view screen. 
   * 
   * @returns {Object} Object with the values of the header.
   */
  async getEmailHeaderResponse() {
    let emailHeaderResponse = {};

    for (const key of Object.keys(this.locatorsEmailPane.headerResponse)) {
      emailHeaderResponse[key] = await promisify(cy.getText(this.locatorsEmailPane.headerResponse[key]));
    }
    
    return emailHeaderResponse;
  }

  /**
   * This method visualizes the body of an email, obtaining its information. 
   * The precondition is to be on the email details view screen. 
   * It is necessary to inform the format of the body content that you want to obtain.
   * 
   * @param {String} formatContent Format of the body content that you want to obtain.
   * @returns {String} Body content in the specified format.
   */
  async getEmailContent(formatContent = "html") {
    this._viewEmailInFormat(formatContent);

    if (formatContent === "links") {
        cy.fail("[Mailinator] Para obter o conteúdo do E-mail no formato de Link, utilize outro método.");
        throw new Error("[Mailinator] Para obter o conteúdo do E-mail no formato de Link, utilize outro método.");
    }

    const emailContent = await promisify(cy.getText(this.locatorsEmailPane.bodyResponse.responseFormats[formatContent].body));
    assertsMailinator._checkEmailContentIsAvailable(emailContent);

    return emailContent;
  }

  /**
   * This method is responsible for setting the format of the email body to be viewed.
   * If format informed not is presents in the types of formats, the method fails.
   * 
   * @param {String} format Format of the body content that you want to obtain.
   */
  _viewEmailInFormat(format) {
    if (!this.locatorsEmailPane.bodyResponse.responseFormats[format]) {
      cy.fail("[Mailinator] Formato de Visualização do E-mail Inválida.");
      throw new Error("[Mailinator] Formato de Visualização do E-mail Inválida.");
    }

    cy.get(this.locatorsEmailPane.bodyResponse.responseFormats[format].navigate).click();

    assertsMailinator._checkChangesFormatBodyResponse(format);
  }

  /**
   * Accesses a link contained in an email based on the provided linkKey.
   *
   * This function navigates to the email content, searches for the specified linkKey
   * within the email's body, and clicks on the corresponding link if found.
   *
   * @param {string} linkKey - The text of the link to be clicked.
   * @throws {Error} Throws an error if the link is not found in the email.
   * @returns {void}
   *
   * @example
   * // Access a link with the text "Click here" in an email
   * accessLinkContainedInEmail("Click here");
   */
  accessLinkContainedInEmail(linkKey) {
    this._viewEmailInFormat("links");

    cy.get(this.locatorsEmailPane.bodyResponse.responseFormats.links.body.content).then(($tbody) => {
      // Init search from the first row (index 0)
      this._findLinkInTable($tbody, linkKey);
    });
  }

  /**
   * This method is responsible for finding the link in the table. This is a recursive method, which searches the link in each row of the table.
   * @param {JQuery<HTMLElement>} $tbody - The <tbody> element containing the links to be searched.
   * @param {string} linkKey - The text of the link to be clicked.
   * @param {number} rowIndex - The index of the row to be searched.
   */
  _findLinkInTable($tbody, linkKey, rowIndex = 0) {
    if (rowIndex >= $tbody.find("tr").length) {
      // If the rowIndex is greater than the number of rows, the link was not found
      cy.fail("[Mailinator] Link não encontrado no e-mail.");
      throw new Error("[Mailinator] Link não encontrado no e-mail.");
    }
  
    cy.wrap($tbody.find("tr").eq(rowIndex)).find("td").first().invoke("text").then(($tdText) => {
      if ($tdText.trim() === linkKey) {
        // If the text of the first <td> matches linkKey, click on the corresponding link
        assertsMailinator._checkLinkFoundInEmail($tdText.trim(), linkKey);

        cy.wrap($tbody.find("tr").eq(rowIndex)).find("a").invoke("removeAttr", "target").click();
      } else {
        // If the text of the first <td> does not match linkKey, search in the next row
        this._findLinkInTable($tbody, linkKey, rowIndex + 1);
      }
    });
  }
}

export default new mailinatorService();
