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
    const customFailureMessage = (field) => {
      return `[Cadastro - Formulário] Houve um problema ao validar a obrigatoriedade do campo ${field}.`;
    };

    cy.elementExpected(
      locatorsToast.error,
      "contains",
      "O título do formulário deve ter pelo menos 2 caracteres.",
      customSuccessMessage("Título do Formulário"),
      customFailureMessage("Título do Formulário")
    );
  }

  CT02() {
    const customSuccessMessage = (field) => {
      return `[Cadastro - Formulário] O campo ${field} está com a obrigatoriedade correta.`;
    };
    const customFailureMessage = (field) => {
      return `[Cadastro - Formulário] Houve um problema ao validar a obrigatoriedade do campo ${field}.`;
    };

    REQUIRED_FIELDS_RULES_FOR_QUESTION_CARD.forEach((rule) => {
      cy.validateAttribute(
        rule.field,
        "aria-invalid",
        rule.isRequired,
        customSuccessMessage(rule.label),
        customFailureMessage(rule.label)
      );
    });
  }

  CT03(elementValue) {
    const customSuccessMessage = `[Cadastro - Formulário] A pergunta foi inserida com sucesso.`;
    const customFailureMessage = `[Cadastro - Formulário] Houve um problema ao tentar inserir a pergunta.`;

    cy.elementExpected(
      locatorsFormRegister.questions(elementValue).card,
      "should",
      "exist",
      customSuccessMessage,
      customFailureMessage
    );
  }

  CT04(elementValue) {
    const customSuccessMessage = `[Cadastro - Formulário] A pergunta foi removida com sucesso.`;
    const customFailureMessage = `[Cadastro - Formulário] Houve um problema ao tentar remover a pergunta.`;

    cy.elementExpected(
      locatorsFormRegister.questions(elementValue).card,
      "should",
      "not.exist",
      customSuccessMessage,
      customFailureMessage
    );
  }

  CT05(elementValue) {
    const customSuccessMessage = `[Cadastro - Formulário] A opção foi adicionada com sucesso.`;
    const customFailureMessage = `[Cadastro - Formulário] Houve um problema ao tentar adicionar a opção.`;

    cy.elementExpected(
      locatorsFormRegister.questions(0).option(elementValue).optionDescription,
      "should",
      "exist",
      customSuccessMessage,
      customFailureMessage
    );
  }

  CT06(elementValue) {
    const customSuccessMessage = `[Cadastro - Formulário] A opção foi removida com sucesso.`;
    const customFailureMessage = `[Cadastro - Formulário] Houve um problema ao tentar remover a opção.`;

    cy.elementExpected(
      locatorsFormRegister.questions(0).option(elementValue).optionDescription,
      "should",
      "not.exist",
      customSuccessMessage,
      customFailureMessage
    );
  }

  CT11(elementValue, expectedValue) {
    const customSuccessMessage = `[Cadastro - Formulário] O formulário '${expectedValue.getFormTitle()}' foi criado com sucesso e está disponível para ser visualizado na página de detalhes do Pet.`;
    const customFailureMessage = `[Cadastro - Formulário] O formulário '${expectedValue.getFormTitle()}' foi criado com sucesso, porém não está disponível para ser visualizado na página de detalhes do Pet.`;

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
    const customSuccessMessage = `[Cadastro - Formulário] O formulário '${expectedValue.getFormTitle()}' foi criado com sucesso e está disponível para ser visualizado na página de detalhes do Pet.`;
    const customFailureMessage = `[Cadastro - Formulário] O formulário '${expectedValue.getFormTitle()}' foi criado com sucesso, porém não está disponível para ser visualizado na página de detalhes do Pet.`;

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

  CT13(elementValue, expectedValue) {
    const customSuccessMessage = `[Cadastro - Formulário] O formulário '${expectedValue.getFormTitle()}' foi criado com sucesso e está disponível para ser visualizado na página de detalhes do Pet. O envio de e-mail para os adotantes não foi realizado.`;
    const customFailureMessage = `[Cadastro - Formulário] Não foi possível criar o formulário '${expectedValue.getFormTitle()}' sem realizar o envio de e-mail para os adotantes.`;

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

  CT21() {
    const customSuccessMessage =
      "[Cadastro - Formulário] O formulário não pode ser criado, pois não possui perguntas. O botão de finalizar formulário está desabilitado.";
    const customFailureMessage =
      "[Cadastro - Formulário] Houve um problema, pois o formulário pode ser criado sem perguntas. O botão de finalizar formulário está habilitado.";

    cy.validateAttribute(
      locatorsFormRegister.navigation.finishFormButton,
      "data-disabled",
      true,
      customSuccessMessage,
      customFailureMessage
    );
  }

  CT22() {
    const customSuccessMessage =
      "[Cadastro - Formulário] O formulário não pode ser criado, pois possui somente uma opção de resposta. Um toast de erro é exibido, informando que é necessário definir ao menos duas opções para cada pergunta.";
    const customFailureMessage =
      "[Cadastro - Formulário] Houve um problema, pois o formulário pode ser criado com somente uma opção de resposta. O toast de erro não foi exibido.";

    cy.elementExpected(
      locatorsToast.error,
      "contains",
      "É necessário definir ao menos duas opções para cada pergunta.",
      customSuccessMessage,
      customFailureMessage
    );
  }

  CT23() {
    const customSuccessMessage =
      "[Cadastro - Formulário] O formulário não pode ser criado, pois não possui nenhuma opção marcada como correta. Um toast de erro é exibido, informando que é necessário definir ao menos uma opção como correta para cada pergunta.";
    const customFailureMessage =
      "[Cadastro - Formulário] Houve um problema, pois o formulário pode ser criado sem nenhuma opção marcada como correta. O toast de erro não foi exibido.";

    cy.elementExpected(
      locatorsToast.error,
      "contains",
      "É necessário definir ao menos uma opção correta para cada pergunta.",
      customSuccessMessage,
      customFailureMessage
    );
  }

  CT31(elementValue, expectedValue) {
    const customSuccessMessage = `[Cadastro - Formulário] O redirecionamento para a página de detalhes do Pet foi realizado com sucesso.`;
    const customFailureMessage = `[Cadastro - Formulário] Houve um problema ao tentar redirecionar para a página de detalhes do Pet.`;

    expected(
      elementValue,
      "contains",
      expectedValue,
      customSuccessMessage,
      customFailureMessage
    );
  }

  CT41() {
    const customSuccessMessage =
      "[Cadastro - Formulário] A tratativa de erro para quando há falha na criação do formulário foi exibida com sucesso.";
    const customFailureMessage =
      "[Cadastro - Formulário] Houve um problema na exibição da tratativa de erro para quando há falha na criação do formulário.";

    cy.elementExpected(
      locatorsToast.error,
      "contains",
      "Houve um problema ao criar o formulário. Por favor, tente novamente mais tarde.",
      customSuccessMessage,
      customFailureMessage
    );
  }
}

export default new Asserts_ST09();
