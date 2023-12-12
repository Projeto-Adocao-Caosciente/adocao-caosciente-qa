// Locators and Routes
import { Routes } from "@routes/routes";
import { locatorsToast } from "@locators/components/locatorsToast";
import { locatorsFormDetails } from "@locators/pages/form/locatorsFormDetails";

// Utils
import { expected } from "@util/util";

class Asserts_ST10 {
  constructor() {}

  CT01(elementValue, expectedValue) {
    const customSuccessMessage = `[Detalhes do Formulário] O resumo do Formulário '${expectedValue.getFormTitle()}' e os seus detalhes foram exibidos corretamente.`;
    const customFailureMessage = `[Detalhes do Formulário] Houve um erro ao exibir o resumo do Formulário '${expectedValue.getFormTitle()}' e os seus detalhes, pois as informações são distintas.`;

    let existsElementNull = false;

    Object.keys(elementValue).forEach((key) => {
      if (elementValue[key] == null) {
        existsElementNull = true;
      }

      if (key !== null && typeof key === "object") {
        Object.keys(key).forEach((subKey) => {
          if (key[subKey] == null) {
            existsElementNull = true;
          }
        });
      }
    });

    expected(
      elementValue,
      "equal",
      expectedValue.getFormTitle(),
      customSuccessMessage,
      customFailureMessage
    );

    expected(
      existsElementNull,
      "equal",
      false,
      customSuccessMessage,
      customFailureMessage
    );
  }

  CT02(elementValue, expectedValue) {
    const customSuccessMessage = `[Detalhes do Formulário] O resumo do Formulário '${expectedValue.getFormTitle()}' e os seus detalhes foram exibidos corretamente.`;
    const customFailureMessage = `[Detalhes do Formulário] Houve um erro ao exibir o resumo do Formulário '${expectedValue.getFormTitle()}' e os seus detalhes, pois as informações são distintas.`;

    let thereIsDifferentValues = false;

    expectedValue.getQuestions().forEach((question, index) => {
      if (elementValue.questions[index].question !== question.question) {
        thereIsDifferentValues = true;
      }
    });

    if (elementValue.title !== expectedValue.getFormTitle()) {
      thereIsDifferentValues = true;
    }

    expected(
      thereIsDifferentValues,
      "equal",
      false,
      customSuccessMessage,
      customFailureMessage
    );
  }

  CT03(elementValue) {
    const customSuccessMessage = `[Detalhes do Formulário] Os e-mails foram enviados com sucesso para os adotantes: ${elementValue}.`;
    const customFailureMessage = `[Detalhes do Formulário] Houve um erro ao enviar os e-mails.`;

    cy.elementExpected(
      locatorsToast.success,
      "contains",
      "E-mails disparados com sucesso",
      customSuccessMessage,
      customFailureMessage
    );
  }

  CT04(elementValue) {
    const customSuccessMessage = `[Detalhes do Formulário] O E-mail foi enviado com sucesso para o adotante: ${elementValue}.`;
    const customFailureMessage = `[Detalhes do Formulário] Houve um erro ao enviar e-mail.`;

    cy.elementExpected(
      locatorsToast.success,
      "contains",
      "E-mails disparados com sucesso",
      customSuccessMessage,
      customFailureMessage
    );
  }

  CT05(routeValue, routeExpected) {
    const customSuccessMessage =
      "[Detalhes do Formulário] O redirecionamento para a página de Detalhes do PET ocorreu com sucesso.";
    const customErrorMessage =
      "[Detalhes do Formulário] Houve um problema ao redirecionar o usuário para a página de Detalhes do PET.";

    expected(
      routeValue,
      "contains",
      routeExpected,
      customSuccessMessage,
      customErrorMessage
    );
  }

  CT06() {
    const customSuccessMessage =
      "[Detalhes do Formulário] O diálogo de envio de e-mails foi fechado com sucesso.";
    const customErrorMessage =
      "[Detalhes do Formulário] Houve um problema ao fechar o diálogo de envio de e-mails.";

    cy.elementExpected(
      locatorsFormDetails.sendEmail.dialog.dialog,
      "should",
      "not.exist",
      customSuccessMessage,
      customErrorMessage
    );
  }

  CT11() {
    const customSuccessMessage = "[Detalhes do Formulário] Ao tentar visualizar os Detalhes de um Formulário inexistente, o usuário foi redirecionado corretamente para a página de Detalhes do PET.";
    const customErrorMessage = "[Detalhes do Formulário] Ao tentar visualizar os Detalhes de um Formulário inexistente, o usuário não foi redirecionado corretamente para a página de Detalhes do PET.";

    cy.elementExpected(
      locatorsToast.error,
      "contains",
      "Não foi possível encontrar o formulário desejado. Por favor, tente novamente mais tarde.",
      customSuccessMessage,
      customErrorMessage
    );
  }
};

export default new Asserts_ST10();
