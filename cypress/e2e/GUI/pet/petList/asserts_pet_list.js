// Locators and Routes
import { Routes } from "@routes/routes";
import { locatorsPetList } from "@locators/pages/pet/locatorsPetList";

// Utils
import { expected } from "@util/util";

class Asserts_ST06 {
  constructor() {}

  CT01(elementValue) {
    const customSuccessMessage =
      "[Listagem de PET's] A listagem de PET's está sendo exibida corretamente.";
    const customFailureMessage =
      "[Listagem de PET's] Houve um erro ao exibir a listagem de PET's.";

    let hasElementNull = false;

    elementValue.forEach((element) => {
      if (element === null || element === undefined) {
        hasElementNull = true;
      }
    });

    expected(
      hasElementNull,
      "equal",
      false,
      customSuccessMessage,
      customFailureMessage
    );
  }

  CT02(data) {
    const customSuccessMessage =
      "[Listagem de PET's] A lista de todos os PET's foi carregada com sucesso.";
    const customFailureMessage =
      "[Listagem de PET's] Não foi possível carregar a lista de todos os PET's.";

    data.data.forEach((element, index) => {
      cy.get(locatorsPetList.list.child(index).info.name)
        .invoke("text")
        .then((text) => {
          const nameValue = text.trim();
          const nameExpected = element.name.trim();

          expected(
            nameValue,
            "equal",
            nameExpected,
            customSuccessMessage,
            customFailureMessage
          );
        });
    });
  }

  CT03() {
    const customSuccessMessage =
      "[Listagem de PET's] O Empty State da Listagem de PET's foi exibido corretamente.";
    const customFailureMessage =
      "[Listagem de PET's] Houve um erro ao exibir o Empty State na listagem de PET's.";

    cy.elementExpected(
      locatorsPetList.list.emptyList,
      "should",
      "exist",
      customSuccessMessage,
      customFailureMessage
    );
  }

  CT04() {
    const customSuccessMessage =
      "[Listagem de PET's] O tratamento de erro na listagem de PET's foi exibido corretamente.";
    const customFailureMessage =
      "[Listagem de PET's] Houve um erro ao exibir o tratamento de erro na listagem de PET's.";

    cy.elementExpected(
      locatorsPetList.list.errorList,
      "should",
      "exist",
      customSuccessMessage,
      customFailureMessage
    );
  }

  CT05(elementValue, expectedValue) {
    const customSuccessMessage = `[Listagem de PET's] O resumo do PET '${expectedValue.getName()}' e os seus detalhes foram exibidos corretamente.`;
    const customFailureMessage = `[Listagem de PET's] Houve um erro ao exibir o resumo do PET '${expectedValue.getName()}' e os seus detalhes, pois as informações são distintas.`;

    expected(
      elementValue.name,
      "equal",
      expectedValue.getName(),
      customSuccessMessage,
      customFailureMessage
    );
  }

  CT10(elementValue, expectedValue) {
    const customSuccessMessage = `[Listagem de PET's] Os resultados pela busca do PET '${expectedValue}' estão sendo exibido corretamente (sem considerar case sensitive).`;
    const customFailureMessage = `[Listagem de PET's] Houve uma falha nos resultados pela busca do PET '${expectedValue}', pois os resultados não condizem com a busca realizada.`;

    expectedValue = expectedValue.toLowerCase();

    elementValue.forEach((element) => {
      const normalizedName = element.name.toLowerCase();

      expected(
        normalizedName,
        "contains",
        expectedValue,
        customSuccessMessage,
        customFailureMessage
      );
    });
  }

  CT07(routeValue, routeExpected) {
    const customSuccessMessage =
      "[Listagem de PET's] O redirecionamento para a página de Cadastro de PET ocorreu com sucesso.";
    const customErrorMessage =
      "[Listagem de PET's] Houve um problema ao redirecionar o usuário para a página de Cadastro de PET.";

    expected(
      routeValue,
      "equal",
      Routes.baseUrl + routeExpected,
      customSuccessMessage,
      customErrorMessage
    );
  }

  CT11(elementValue1, elementValue2, expectedValue) {
    const customSuccessMessage = `[Listagem de PET's] Os resultados pela busca do PET '${expectedValue}' estão sendo exibido corretamente, levando em consideração o Case Sensitive.`;
    const customFailureMessage = `[Listagem de PET's] Houve uma falha nos resultados pela busca do PET '${expectedValue}', pois os resultados não condizem com a busca realizada, levando em considereação o Case Sensitive.`;

    let differenteElementFound = false;

    elementValue1.forEach((element, index) => {
      const nameOfFirstSearch = element.name;
      const nameOfSecondSearch = elementValue2[index].name;

      if (nameOfFirstSearch !== nameOfSecondSearch) {
        differenteElementFound = true;
      }
    });

    expected(
      differenteElementFound,
      "equal",
      false,
      customSuccessMessage,
      customFailureMessage
    );
  }

  CT12(elementValue1, elementValue2, expectedValue) {
    const customSuccessMessage = `[Listagem de PET's] Os resultados pela busca do PET '${expectedValue}' estão sendo exibido corretamente, levando em consideração a Acentuação.`;
    const customFailureMessage = `[Listagem de PET's] Houve uma falha nos resultados pela busca do PET '${expectedValue}', pois os resultados não condizem com a busca realizada, levando em considereação a Acentuação.`;

    let differenteElementFound = false;

    elementValue1.forEach((element, index) => {
      const nameOfFirstSearch = element.name;
      const nameOfSecondSearch = elementValue2[index].name;

      if (nameOfFirstSearch !== nameOfSecondSearch) {
        differenteElementFound = true;
      }
    });

    expected(
      differenteElementFound,
      "equal",
      false,
      customSuccessMessage,
      customFailureMessage
    );
  }

  CT13(elementValue1, elementValue2, expectedValue) {
    const customSuccessMessage = `[Listagem de PET's] Os resultados pela busca do PET '${expectedValue}' estão sendo exibido corretamente, levando em consideração o Nome Completo (com espaços).`;
    const customFailureMessage = `[Listagem de PET's] Houve uma falha nos resultados pela busca do PET '${expectedValue}', pois os resultados não condizem com a busca realizada, levando em considereação o Nome Completo (com espaços).`;

    let differenteElementFound = false;

    elementValue1.forEach((element, index) => {
      const nameOfFirstSearch = element.name;
      const nameOfSecondSearch = elementValue2[index].name;

      if (nameOfFirstSearch !== nameOfSecondSearch) {
        differenteElementFound = true;
      }
    });

    expected(
      differenteElementFound,
      "equal",
      false,
      customSuccessMessage,
      customFailureMessage
    );
  }

  CT14(elementValue) {
    const customSuccessMessage =
      "[Listagem de PET's] Não foram encontrados resultados pela busca de um PET inexistente.";
    const customFailureMessage =
      "[Listagem de PET's] Houve uma falha na busca de um PET inexistente.";

    cy.elementExpected(
      locatorsPetList.list.emptyList,
      "should",
      "exist",
      customSuccessMessage,
      customFailureMessage
    );
  }
}

export default new Asserts_ST06();
