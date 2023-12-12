// Locators and Routes
import { Routes } from "@routes/routes";
import { locatorsToast } from "@locators/components/locatorsToast";
import { locatorsFormRegister } from "@locators/pages/form/locatorsFormRegister";

// Utils
import { expected } from "@util/util";

const REQUIRED_FIELDS_RULES_FOR_FORM = [
  {
    field: locatorsFormRegister.titleForm,
    label: "Título do Formulário",
    isRequired: true,
  },
];

const REQUIRED_FIELDS_RULES_FOR_QUESTION_CARD = [
  {
    field: locatorsFormRegister.questions(0).questionTitle,
    label: "Título da Pergunta",
    isRequired: true,
  },
  {
    field: locatorsFormRegister.questions(0).option(0).optionDescription,
    label: "Opção 1 da Pergunta 1",
    isRequired: true,
  },
];

const REQUIRED_FIELDS_RULES_FOR_SEND_EMAIL_DIALOG = [
  {
    field: locatorsFormRegister.sendEmail.emailInput,
    label: "E-mail do Destinatário",
    isRequired: true,
  },
];

class Asserts_ST09 {
  constructor() {}

  CT01() {
    const customSuccessMessage = (field) => {
      return `[Cadastro - Formulário] O campo ${field} está com a obrigatoriedade correta.`;
    };
    const customErrorMessage = (field) => {
      return `[Cadastro - Formulário] Houve um problema ao validar a obrigatoriedade do campo ${field}.`;
    };

    cy.elementExpected(
      locatorsToast.error,
      "contains",
      "O título do formulário deve ter pelo menos 2 caracteres.",
      customSuccessMessage("Título do Formulário"),
      customErrorMessage("Título do Formulário")
    );
  }

  CT02() {
    const customSuccessMessage = (field) => {
      return `[Cadastro - Formulário] O campo ${field} está com a obrigatoriedade correta.`;
    };
    const customErrorMessage = (field) => {
      return `[Cadastro - Formulário] Houve um problema ao validar a obrigatoriedade do campo ${field}.`;
    };

    REQUIRED_FIELDS_RULES_FOR_QUESTION_CARD.forEach((rule) => {
      cy.validateAttribute(
        rule.field,
        "aria-invalid",
        rule.isRequired,
        customSuccessMessage(rule.label),
        customErrorMessage(rule.label)
      );
    });
  }

  CT11(elementValue, expectedValue) {
    const customSuccessMessage =
      `[Cadastro - Formulário] O formulário '${expectedValue.getFormTitle()}' foi criado com sucesso e está disponível para ser visualizado na página de detalhes do Pet.`;
    const customFailureMessage =
      `[Cadastro - Formulário] O formulário '${expectedValue.getFormTitle()}' foi criado com sucesso, porém não está disponível para ser visualizado na página de detalhes do Pet.`;

    let formsExistsInList = false;

    elementValue.forEach((element) => {
      if (expectedValue.getFormTitle() === element) {
        formsExistsInList = true;
        return;
      }
    });

    expected(
      formsExistsInList,
      "equal",
      true,
      customSuccessMessage,
      customFailureMessage
    );
  }

  CT12(elementValue, expectedValue) {
    const customSuccessMessage =
      `[Cadastro - Formulário] O formulário '${expectedValue.getFormTitle()}' foi criado com sucesso e está disponível para ser visualizado na página de detalhes do Pet.`;
    const customFailureMessage =
      `[Cadastro - Formulário] O formulário '${expectedValue.getFormTitle()}' foi criado com sucesso, porém não está disponível para ser visualizado na página de detalhes do Pet.`;

    let formsExistsInList = false;

    elementValue.forEach((element) => {
      if (expectedValue.getFormTitle() === element) {
        formsExistsInList = true;
        return;
      }
    });

    expected(
      formsExistsInList,
      "equal",
      true,
      customSuccessMessage,
      customFailureMessage
    );
  }
}

export default new Asserts_ST09();
