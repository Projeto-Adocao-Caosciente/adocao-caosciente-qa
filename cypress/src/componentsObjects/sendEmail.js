// Locators & Routes
import { Routes } from "@routes/routes";
import { locatorsToast } from "@locators/components/locatorsToast";

// Util
import { getValue, expected } from "@util/util";
import promisify from "cypress-promise";

class sendEmail {
  constructor(emailsToSend = [], locators) {
    this.emailsToSend = emailsToSend;
    this.locatorsSendEmail = locators;
  }

  addManyRecipients() {
    this.emailsToSend.forEach((email) => {
      this._addRecipient(email);
    });

    this.sendEmail();
  }

  _addOneRecipient(email) {
    this.fillEmailInput(email);
    this.clickAddEmailButton();

    this._checksIfTheRecipientWasAdded(email);
  }

  fillEmailInput(email) {
    cy.get(this.locatorsSendEmail.emailInput).type(email);
  }

  clickAddEmailButton() {
    cy.get(this.locatorsSendEmail.addEmailButton).click();
  }

  removeRecipient(email) {
    cy.get(
      this.locatorsSendEmail.listOfRecipients(email).deleteRecipient
    ).click();
  }

  sendEmail() {
    cy.get(this.locatorsSendEmail.navigation.sendEmailButton).click();

    this._checksIfTheEmailsWereSent();
  }

  cancelSendEmail() {
    cy.get(this.locatorsSendEmail.navigation.backButton).click();
  }

  _checksIfTheRecipientWasAdded(email) {
    const customSuccessMessage = `[DialogSendEmail] O e-mail ${email} foi adicionado com sucesso à lista de destinatários.`;
    const customFailureMessage = `[DialogSendEmail] Houve um erro ao adicionar o e-mail ${email} à lista de destinatários.`;

    cy.elementExpected(
      this.locatorsSendEmail.listOfRecipients(email).user,
      "should",
      "exist",
      customSuccessMessage,
      customFailureMessage
    );
  }

  _checksIfTheEmailsWereSent() {
    const customSuccessMessage = `[DialogSendEmail] Os e-mails foram enviados com sucesso.`;
    const customFailureMessage = `[DialogSendEmail] Houve um erro ao enviar os e-mails.`;

    cy.elementExpected(
      locatorsToast.success,
      "should",
      "exist",
      customSuccessMessage,
      customFailureMessage
    );
  }
}

export { sendEmail };
