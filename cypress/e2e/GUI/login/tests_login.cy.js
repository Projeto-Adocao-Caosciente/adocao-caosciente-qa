// Locators and Routes
import { Routes } from "../../../src/routes/routes";
import { locatorsLogin } from "../../../src/locators/pages/login/locatorsLogin";

// Asserts to Suite Test 00: Login
import Asserts_ST00 from "./asserts_login";

describe("ST00: Testes Funcionais na Página de Login", () => {
  it("CT01: Validar obrigatoriedade dos Campos.", () => {
    cy.visit(Routes.login);
    cy.get(locatorsLogin.loginButton).click();

    Asserts_ST00.CT01();
  });

  it("CT02: Validar máscara do campo CNPJ/CPF.", () => {
    cy.visit(Routes.login);
    cy.get(locatorsLogin.user).type("1234");
    cy.get(locatorsLogin.loginButton).click();

    Asserts_ST00.CT02();
  });

  it("CT03: Validar exibição/ocultação da Senha.", () => {
    cy.visit(Routes.login);
    cy.get(locatorsLogin.password).type("1234");
    cy.get(locatorsLogin.changeHiddenPassword).click();

    Asserts_ST00.CT03();
  });

  it("CT04: Validar a funcionalidade do botão 'Cadastre-se'.", () => {
    const routeExpected = Routes.signup;

    cy.visit(Routes.login);
    cy.get(locatorsLogin.signup).click();

    cy.url().then((routeObtained) => {
        Asserts_ST00.CT04(routeObtained, routeExpected);
    });
  });
});
