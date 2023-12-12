// Locators & Routes
import { Routes } from "@routes/routes";
import { ApiRoutes } from "@routes/apiRoutes";
import { locatorsToast } from "@locators/components/locatorsToast";

// Util
import { getValue, expected } from "@util/util";
import promisify from "cypress-promise";

class sendEmail {
  constructor(emailsToSend = [], locators, routeRedirect) {
    this.emailsToSend = emailsToSend;
    this.locatorsSendEmail = locators;
    this.routeRedirect = routeRedirect || Routes.pet.details;
  }

  addManyRecipients() {
    const numberOfEmailsToSend = this.emailsToSend.length;
    this._checksIfDialogSendEmailIsOpen();

    if (numberOfEmailsToSend > 0) {
      this.emailsToSend.forEach((email) => {
        this._addOneRecipient(email);
      });

      this.sendEmail();

    } else {
      this.cancelSendEmail();
    }
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
    cy.intercept("POST", ApiRoutes.mail.sendMail).as("sendEmail");

    if (this.routeRedirect === Routes.pet.details) {
      cy.intercept("GET", ApiRoutes.ong.pet.getOne).as("getPetDetails");
      cy.intercept("GET", ApiRoutes.ong.pet.form.getAll).as("getAllForms");
    }

    cy.get(this.locatorsSendEmail.navigation.sendEmailButton).click();
    cy.wait("@sendEmail");

    if (this.routeRedirect === Routes.pet.details) {
      cy.wait("@getPetDetails");
      cy.wait("@getAllForms");
    }

    // TODO: Fix this after the bug in frontend is fixed
    //this._checksIfTheEmailsWereSent();
  }

  cancelSendEmail() {
    if (this.routeRedirect === Routes.pet.details) {
      cy.intercept("GET", ApiRoutes.ong.pet.getOne).as("getPetDetails");
      cy.intercept("GET", ApiRoutes.ong.pet.form.getAll).as("getAllForms");
    }
    cy.get(this.locatorsSendEmail.navigation.backButton).click();
    
    if (this.routeRedirect === Routes.pet.details) {
      cy.wait("@getPetDetails");
      cy.wait("@getAllForms");
    }
  }

  _checksIfDialogSendEmailIsOpen() {
    const customSuccessMessage = `[DialogSendEmail] O diálogo de envio de e-mails está aberto.`;
    const customFailureMessage = `[DialogSendEmail] Houve um problema ao enviar os e-mails pois o diálogo de envio de e-mails não está aberto.`;

    cy.elementExpected(
      this.locatorsSendEmail.dialog,
      "should",
      "exist",
      customSuccessMessage,
      customFailureMessage
    );
  }

  _checksIfTheRecipientWasAdded(email) {
    const customSuccessMessage = `[DialogSendEmail] O e-mail '${email}' foi adicionado com sucesso à lista de destinatários.`;
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
      "contains",
      "E-mails enviados com sucesso!",
      customSuccessMessage,
      customFailureMessage
    );
  }
}

export { sendEmail };
