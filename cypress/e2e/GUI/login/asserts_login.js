// Locators and Routes
import { expected } from "../../../src/util/util";
import { Routes } from "../../../src/routes/routes";
import { locatorsLogin } from "../../../src/locators/pages/login/locatorsLogin";

class Asserts_ST00 {
  constructor() {
    this.baseUrl = "https://adocao-caosciente-frontend.vercel.app";
  }

  CT01() {
    const customSuccessMessage =
      "[Login] O campo CNPJ/CPF está com a obrigatoriedade correta.";
    const customErrorMessage =
      "[Login] Não foi possível validar a obrigatoriedade do campo CNPJ/CPF.";

    cy.validateAttribute(
      locatorsLogin.user,
      "aria-invalid",
      true,
      true,
      customSuccessMessage,
      customErrorMessage
    );

    cy.validateAttribute(
      locatorsLogin.password,
      "aria-invalid",
      true,
      customSuccessMessage,
      customErrorMessage
    );
  }

  CT02() {
    const customSuccessMessage = "[Login] O campo CNPJ/CPF está com a máscara correta.";
    const customErrorMessage = "[Login] Não foi possível validar a máscara do campo CNPJ/CPF.";

    cy.validateAttribute(
      locatorsLogin.user,
      "aria-invalid",
      true,
      true,
      customSuccessMessage,
      customErrorMessage
    );
  }

  CT03() {
    const customSuccessMessage = "[Login] O campo CNPJ/CPF está com a máscara correta.";
    const customErrorMessage = "[Login] Não foi possível validar a máscara do campo CNPJ/CPF.";

    cy.validateAttribute(
      locatorsLogin.password,
      "type",
      "text",
      false,
      customSuccessMessage,
      customErrorMessage
    );
  }

  CT04(routeValue, routeExpected) {
    const customSuccessMessage = "[Rotas] A página de Cadastro foi visitada com sucesso.";
    const customErrorMessage = "[Rotas] Não foi possível visitar a página de Cadastro.";

    expected(
      routeValue,
      "equal",
      this.baseUrl + routeExpected,
      customSuccessMessage,
      customErrorMessage
    );
  }
}

export default new Asserts_ST00();
