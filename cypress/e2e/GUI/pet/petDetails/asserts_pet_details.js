// Locators and Routes
import { Routes } from "@routes/routes";
import { locatorsToast } from "@locators/components/locatorsToast";
import { locatorsPetDetails } from "@locators/pages/pet/locatorsPetDetails";

// Utils
import { expected } from "@util/util";

class Asserts_ST07 {
  constructor() {}

  CT01(elementValue, expectedValue) {
    const customSuccessMessage = `[Detalhes de PET] O resumo do PET '${expectedValue.getName()}' e os seus detalhes foram exibidos corretamente.`;
    const customFailureMessage = `[Detalhes de PET] Houve um erro ao exibir o resumo do PET '${expectedValue.getName()}' e os seus detalhes, pois as informações são distintas.`;

    let existsElementNull = false;

    Object.keys(elementValue).forEach((key) => {
      if (elementValue[key] == null) {
        existsElementNull = true;
      }
    });

    expected(
      elementValue.name,
      "equal",
      expectedValue.getName(),
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
    const customSuccessMessage = `[Detalhes de PET] O resumo do PET '${expectedValue.getName()}' e os seus detalhes foram exibidos corretamente.`;
    const customFailureMessage = `[Detalhes de PET] Houve um erro ao exibir o resumo do PET '${expectedValue.getName()}' e os seus detalhes, pois as informações são distintas.`;

    let thereIDifferentValues = false;

    if (
      elementValue.name !== expectedValue.getName() ||
      elementValue.breed !== expectedValue.getBreed() ||
      elementValue.type !== expectedValue.getKind() ||
      elementValue.height !== expectedValue.getHeight() ||
      elementValue.weight !== expectedValue.getWeight()
    ) {
      thereIDifferentValues = true;
    }

    expected(
      thereIDifferentValues,
      "equal",
      false,
      customSuccessMessage,
      customFailureMessage
    );
  }

  CT11(routeValue, routeExpected) {
    const customSuccessMessage =
      "[Detalhes de PET] O redirecionamento para a página de Criação de um Formulário de Adoção ocorreu com sucesso.";
    const customErrorMessage =
      "[Detalhes de PET] Houve um problema ao redirecionar o usuário para a página de Criação de um Formulário de Adoção.";

    expected(
      routeValue,
      "contains",
      routeExpected,
      customSuccessMessage,
      customErrorMessage
    );
  }

  CT12(routeValue, routeExpected) {
    const customSuccessMessage =
      "[Detalhes de PET] O redirecionamento para a página de Listagem de PET's da ONG ocorreu com sucesso.";
    const customErrorMessage =
      "[Detalhes de PET] Houve um problema ao redirecionar o usuário para a página de Listagem de PET's da ONG.";

    expected(
      routeValue,
      "contains",
      routeExpected,
      customSuccessMessage,
      customErrorMessage
    );
  }

  CT13(routeValue, routeExpected) {
    const customSuccessMessage =
      "[Detalhes de PET] O redirecionamento para a página de Criação de um Formulário de Adoção ocorreu com sucesso.";
    const customErrorMessage =
      "[Detalhes de PET] Houve um problema ao redirecionar o usuário para a página de Criação de um Formulário de Adoção.";

    expected(
      routeValue,
      "contains",
      routeExpected,
      customSuccessMessage,
      customErrorMessage
    );
  }

  CT14(routeValue, routeExpected) {
    const customSuccessMessage =
      "[Detalhes de PET] O redirecionamento para a página de Visualização de um Formulário de Adoção ocorreu com sucesso.";
    const customErrorMessage =
      "[Detalhes de PET] Houve um problema ao redirecionar o usuário para a página de Visualização de um Formulário de Adoção.";

    expected(
      routeValue,
      "contains",
      routeExpected,
      customSuccessMessage,
      customErrorMessage
    );
  }

  CT21() {
    const customSuccessMessage = "[Detalhes de PET] Ao tentar visualizar os Detalhes de um PET inexistente, o usuário foi redirecionado corretamente para a página de Listagem de PET's da ONG.";
    const customErrorMessage = "[Detalhes de PET] Ao tentar visualizar os Detalhes de um PET inexistente, o usuário não foi redirecionado corretamente para a página de Listagem de PET's da ONG.";

    cy.elementExpected(
      locatorsToast.error,
      "contains",
      "Não foi possível encontrar o Pet desejado. Por favor, tente novamente mais tarde.",
      customSuccessMessage,
      customErrorMessage
    );
  }

  CT22() {
    const customSuccessMessage = "[Detalhes de PET] O empty state de Formulários de Adoção foi exibido corretamente na página de Detalhes do PET selecionado.";
    const customErrorMessage = "[Detalhes de PET] Houve um erro ao exibir o empty state de Formulários de Adoção na página de Detalhes do PET selecionado.";

    cy.elementExpected(
      locatorsPetDetails.forms.emptyList.message,
      "contains",
      "Não existem formulários de adoção atrelados a esse animal",
      customSuccessMessage,
      customErrorMessage
    );
  }

  CT23() {
    const customSuccessMessage = "[Detalhes de PET] O placeholder de erro de exibição dos Formulários de Adoção foi exibido corretamente na página de Detalhes do PET selecionado.";
    const customErrorMessage = "[Detalhes de PET] Houve um erro ao exibir o placeholder de erro de exibição dos Formulários de Adoção na página de Detalhes do PET selecionado.";

    cy.elementExpected(
      locatorsPetDetails.forms.error.message,
      "contains",
      "Não foi possível buscar os formulários de adoção atrelados a esse animal",
      customSuccessMessage,
      customErrorMessage
    );
  }
}

export default new Asserts_ST07();
