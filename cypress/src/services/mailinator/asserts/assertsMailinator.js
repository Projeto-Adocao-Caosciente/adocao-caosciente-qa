// Locators and Utils
import { locatorsInboxPaneMailinator, locatorsEmailPaneMailinator } from "../locatorsMailinator";

import { getValue } from "../util/getValue";
import { expected, elementExpected } from "../util/validate";

class Asserts_Mailinator {
  /**
   * This method checks that the action of pausing the receipt of emails has been performed successfully.
   * To do this, it is analyzed whether the pause button was changed to the unpause button.
   * 
   * @returns {void}
   */
  _checkHasBeenPaused() {
    const customSuccessMessage = "[Mailinator] A ação de pausar o recebimento de e-mail's foi realizada com sucesso.";
    const customFailureMessage = "[Mailinator] Não foi possível pausar o recebimento de e-mail's.";

    elementExpected(
      locatorsInboxPaneMailinator.commands.unpauseReceivedEmails,
      "should",
      "visible",
      customSuccessMessage,
      customFailureMessage
    );
  }

  /**
   * This method checks that the action of unpausing the receipt of emails has been performed successfully.
   * To do this, it is analyzed whether the unpause  button was changed to the pause button.
   * 
   * @returns {void}
   */
  _checkHasBeenUnpaused() {
    const customSuccessMessage = "[Mailinator] A ação de reativar o recebimento de e-mail's foi realizada com sucesso.";
    const customFailureMessage = "[Mailinator] Não foi possível reativar o recebimento de e-mail's.";

    elementExpected(
      locatorsInboxPaneMailinator.commands.pauseReceivedEmails,
      "should",
      "visible",
      customSuccessMessage,
      customFailureMessage
    );
  }

  /**
   * This method checks whether the email was actually deleted from the email list. 
   * To do this, it is analyzed whether it is no longer available in the list, checking its index in the table.
   * 
   * @param {Object} emailDeleted The email to be deleted {from, subject, received}
   * @param {Object} emailsObtained The email obtained from index of the email deleted
   */
  _checkEmailHasBeenDeleted(emailDeleted, emailObtained) {
    const customSuccessMessage = "[Mailinator] O E-mail selecionado foi deletado com sucesso.";
    const customFailureMessage = "[Mailinator] Não foi possível deletar o e-mail desejado.";

    expected(
      emailDeleted.subject,
      "not.equal",
      emailObtained.subject,
      customSuccessMessage,
      customFailureMessage
    );
  }

  /**
   * This method checks whether the emails were actually deleted from the email list.
   * To do this, it is analyzed whether they are no longer available in the list, checking your indexes in the table.
   * 
   * @param {List<Object>} emailsDeleted The emails to be deleted {from, subject, received}
   * @param {List<Object>} emailsObtained The emails obtained from indexes of the emails deleted
   */
  _checkEmailsHasBeenDeleted(emailsDeleted, emailsObtained) {
    const customSuccessMessage = "[Mailinator] Os E-mails selecionados foram deletados com sucesso.";
    const customFailureMessage = "[Mailinator] Não foi possível deletar os e-mails desejados.";

    let emailRepeated = false;

    emailsObtained.forEach((emailObtained) => {
      emailsDeleted.forEach((emailDeleted) => {
        if (emailDeleted.subject === emailObtained.subject) {
          emailRepeated = true;
        }
      })
    });

    expected(
      emailRepeated,
      "not.equal",
      true,
      customSuccessMessage,
      customFailureMessage
    );
  }

  /**
   * This method checks whether the email content (email body) are visible after clicking on view details.
   * 
   * @param {string} emailContent The email content to be checked (html, text, json, raw)
   * @returns {void}
   */
  _checkEmailContentIsAvailable(emailContent) {
    const customSuccessMessage = "[Mailinator] O conteúdo do e-mail está disponível.";
    const customFailureMessage = "[Mailinator] Não foi possível visualizar o conteúdo do e-mail.";

    expected(
      emailContent,
      "not.null",
      null,
      customSuccessMessage,
      customFailureMessage
    );
  }

  /**
   * This method checks whether the email content display format has been successfully changed to the user-specified format. 
   * 
   * @param {string} format The format to be checked (html, text, json, raw)
   * @returns {void}
   */
  _checkChangesFormatBodyResponse(format) {
    const customSuccessMessage = `[Mailinator] O formato do corpo da resposta do E-mail foi alterado com sucesso para ${format}`;
    const customFailureMessage = "[Mailinator] O formato do corpo da resposta não foi alterado.";

    elementExpected(
      locatorsEmailPaneMailinator.bodyResponse.responseFormats[format].navigate,
      "should",
      "is.active",
      customSuccessMessage,
      customFailureMessage
    );
  }

  /**
   * This method checks whether the desired link (which you want to click) is contained in the body of the email or not.
   * 
   * @param {string} linkObtained  The link obtained from the email body
   * @param {string} linkExpected The link expected to be found in the email body
   * @returns {void}
   */
  _checkLinkFoundInEmail(linkObtained, linkExpected) {
    const customSuccessMessage = `[Mailinator] O link desejado '${linkExpected}' foi encontrado com sucesso no corpo do e-mail.`;
    const customFailureMessage = `[Mailinator] Não foi possível encontrar o link desejado '${linkExpected}' no corpo do e-mail.`;

    expected(
      linkObtained,
      "equal",
      linkExpected,
      customSuccessMessage,
      customFailureMessage
    );
  }
}

export default new Asserts_Mailinator();
