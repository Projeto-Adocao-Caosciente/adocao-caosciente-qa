// Locators and Routes
import { Routes } from "@routes/routes";
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

    console.log(elementValue)
    console.log(expectedValue)

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
      "[Detalhes de PET] O redirecionamento para a página de Detalhes do PET ocorreu com sucesso.";
    const customErrorMessage =
      "[Detalhes de PET] Houve um problema ao redirecionar o usuário para a página de Detalhes do PET.";

    expected(
      routeValue,
      "equal",
      Routes.baseUrl + routeExpected,
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
      "equal",
      Routes.baseUrl + routeExpected,
      customSuccessMessage,
      customErrorMessage
    );
  }
}

export default new Asserts_ST07();
