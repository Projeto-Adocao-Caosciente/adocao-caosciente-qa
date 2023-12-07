// Locators and Routes
import { Routes } from '@routes/routes';
import { expected } from '@util/util';
import { locatorsLogin } from "../../../src/locators/pages/login/locatorsLogin";

// Page Objects
import login from "../../../src/pageObjects/login/login";

// Asserts to Suite Test 00: Login
import Asserts_ST00 from "./asserts_login";

describe("ST00: Análise do Funcionamento da Página de Login.", () => {
  beforeEach(() => {
    cy.visit(Routes.login);
    expected(10, "equal", 10, "Expected value is equal.", "Expected value is not equal.")
  });

  context("Context 01: Testes Funcionais nos Campos na Página de Login.", () => {
    it("CT01: Validar obrigatoriedade dos Campos.", () => {
      login.clickOnLoginButton();
  
      Asserts_ST00.CT01();
    });
  
    it("CT02: Validar máscara do campo CNPJ/CPF.", () => {
      const invalidCnpj = "1234";

      cy.get(locatorsLogin.user).type(invalidCnpj);
      login.clickOnLoginButton();
  
      Asserts_ST00.CT02();
    });
  
    it("CT03: Validar exibição/ocultação da Senha.", () => {
      const defaultPassword = "password";

      cy.get(locatorsLogin.password).type(defaultPassword);
      login.changePasswordHiding();
  
      Asserts_ST00.CT03();
    });
  });

  context("Context 02: Validar Cenários de Login com Credenciais Válidas", () => {
    it("CT04: Validar Login de uma ONG com Credenciais Válidas.", () => {
      const ongCredentials = {
        username: "27352107000155",
        password: "Teste123*",
        userType: "ONG",
      }

      login.loginWithoutValidation(ongCredentials.username, ongCredentials.password);
      
      Asserts_ST00.CT04(ongCredentials);
    });

    it("CT05: Validar Login de um Adotante com Credenciais Válidas.", () => {
      const adopterCredentials = {
        username: "37139142815",
        password: "Teste123*",
        userType: "ADOPTER",
      }

      login.loginWithoutValidation(adopterCredentials.username, adopterCredentials.password);

      Asserts_ST00.CT05(adopterCredentials);
    });
  });

  context("Context 03: Validar Cenários de Login com Credenciais Incorretas", () => {
    it("CT07: Validar Login de uma ONG com Credenciais Incorretas.", () => {
      const ongCredentials = {
        username: "99999999999999",
        password: "!DETG%BJO0",
        userType: "ONG",
      }

      login.loginWithoutValidation(ongCredentials.username, ongCredentials.password);

      Asserts_ST00.CT07();
    });

    it("CT08: Validar Login de um Adotante com Credenciais Incorretas.", () => {
      const adopterCredentials = {
        username: "11111111111",
        password: "!DETG%BJO0",
        userType: "ADOPTER",
      }

      login.loginWithoutValidation(adopterCredentials.username, adopterCredentials.password);

      Asserts_ST00.CT08();
    });
  });

  context("Context 04: Validar Redirecionamento de Links na Página de Login.", () => {
    it("CT10: Validar a funcionalidade do botão 'Cadastre-se como Adotante'.", () => {
      const routeExpected = Routes.register.adopter;
  
      login.clickOnRegisterAdopter();
  
      cy.url().then((routeObtained) => {
          Asserts_ST00.CT10(routeObtained, routeExpected);
      });
    });

    it("CT11: Validar a funcionalidade do botão 'Cadastre-se como ONG'.", () => {
      const routeExpected = Routes.register.ong;
  
      login.clickOnRegisterOng();
  
      cy.url().then((routeObtained) => {
          Asserts_ST00.CT11(routeObtained, routeExpected);
      });
    });
  });
});
