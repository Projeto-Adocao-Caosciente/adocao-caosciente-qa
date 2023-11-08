// Locators and Routes
import { Routes } from "../../../../src/routes/routes";
import { locatorsPetRegister } from "../../../../src/locators/pages/pet/locatorsPetRegister";
import { locatorsToast } from "../../../../src/locators/components/locatorsToast";

// Utils
import { expected } from "../../../../src/util/util";
import { el } from "@faker-js/faker";

class Asserts_ST05 {
  constructor() {}

  CT01() {
    const customSuccessMessage = (field) => {
      return `[Cadastro - PET] O campo ${field} está com a obrigatoriedade correta.`;
    };
    const customErrorMessage = (field) => {
      return `[Cadastro - PET] Houve um problema ao validar a obrigatoriedade do campo ${field}.`;
    };

    cy.validateAttribute(
      locatorsPetRegister.profilePhotoInput,
      "aria-invalid",
      true,
      customSuccessMessage("Imagem de Perfil"),
      customErrorMessage("Imagem de Perfil")
    );

    cy.validateAttribute(
      locatorsPetRegister.name,
      "aria-invalid",
      true,
      customSuccessMessage("Nome do PET"),
      customErrorMessage("Nome do PET")
    );

    cy.validateAttribute(
      locatorsPetRegister.breed,
      "aria-invalid",
      true,
      customSuccessMessage("Raça do PET"),
      customErrorMessage("Raça do PET")
    );

    cy.validateAttribute(
      locatorsPetRegister.kind,
      "aria-invalid",
      true,
      customSuccessMessage("Tipo do PET"),
      customErrorMessage("Tipo do PET")
    );

    cy.validateAttribute(
      locatorsPetRegister.height,
      "aria-invalid",
      true,
      customSuccessMessage("Altura do PET"),
      customErrorMessage("Altura do PET")
    );

    cy.validateAttribute(
      locatorsPetRegister.weight,
      "aria-invalid",
      true,
      customSuccessMessage("Peso do PET"),
      customErrorMessage("Peso do PET")
    );
  }

  CT09(elementValue, expectedValue) {
    const customSuccessMessage =
      "[Cadastro - PET] O PET foi Cadastrado com Sucesso com Todos os Campos.";
    const customErrorMessage =
      "[Cadastro - PET] Houve um problema ao Cadastrar o PET com Todos os Campos.";

    let elementFound = false;

    elementValue.forEach((element) => {
      if (element.name == expectedValue.getName()) {
        elementFound = true;
        return;
      }
    });

    expected(
      elementFound,
      "equal",
      true,
      customSuccessMessage,
      customErrorMessage
    );

    cy.elementExpected(
      locatorsToast.success,
      "should",
      "exist",
      customSuccessMessage,
      customErrorMessage
    );
  }

  CT10(elementValue, expectedValue) {
    const customSuccessMessage =
      "[Cadastro - PET] O PET foi Cadastrado com Sucesso com Apenas os Campos Obrigatórios.";
    const customErrorMessage =
      "[Cadastro - PET] Houve um problema ao Cadastrar o PET com Apenas os Campos Obrigatórios.";

    let elementFound = false;

    elementValue.forEach((element) => {
      if (element.name == expectedValue.getName()) {
        elementFound = true;
        return;
      }
    });

    expected(
      elementFound,
      "equal",
      true,
      customSuccessMessage,
      customErrorMessage
    );

    cy.elementExpected(
      locatorsToast.success,
      "should",
      "exist",
      customSuccessMessage,
      customErrorMessage
    );
  }

  CT12() {
    const customSuccessMessage = (field) => {
      return `[Cadastro - PET] O campo ${field} está com a obrigatoriedade correta.`;
    };
    const customErrorMessage = (field) => {
      return `[Cadastro - PET] Houve um problema ao validar a obrigatoriedade do campo ${field}.`;
    };

    cy.validateAttribute(
      locatorsPetRegister.profilePhotoInput,
      "aria-invalid",
      true,
      customSuccessMessage("Imagem de Perfil"),
      customErrorMessage("Imagem de Perfil")
    );

    cy.validateAttribute(
      locatorsPetRegister.height,
      "aria-invalid",
      true,
      customSuccessMessage("Altura do PET"),
      customErrorMessage("Altura do PET")
    );

    cy.validateAttribute(
      locatorsPetRegister.weight,
      "aria-invalid",
      true,
      customSuccessMessage("Peso do PET"),
      customErrorMessage("Peso do PET")
    );
  }

  CT13(routeValue, routeExpected) {
    const customSuccessMessage =
      "[Cadastro - PET] O redirecionamento para a página de Listagem de PET's da ONG ocorreu com sucesso.";
    const customErrorMessage =
      "[Cadastro - PET] Houve um problema ao redirecionar o usuário para a página de Listagem de PET's da ONG.";

    expected(
      routeValue,
      "equal",
      Routes.baseUrl + routeExpected,
      customSuccessMessage,
      customErrorMessage
    );
  }
}

export default new Asserts_ST05();
