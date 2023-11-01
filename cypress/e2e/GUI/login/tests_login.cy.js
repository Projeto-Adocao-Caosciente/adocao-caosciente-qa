// Locators and Routes
import { Routes } from "../../../src/routes/routes";
import { locatorsLogin } from "../../../src/locators/pages/login/locatorsLogin";

// Page Objects
import login from "../../../src/pageObjects/login/login";

// Asserts to Suite Test 00: Login
import Asserts_ST00 from "./asserts_login";

describe("ST00: Análise do Funcionamento da Página de Login.", () => {
  beforeEach(() => {
    cy.visit(Routes.login);
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

  context.skip("Context 02: Validar Cenários de Login com Credenciais Válidas", () => {
    it("CT04: Validar Login de uma ONG com Credenciais Válidas.", () => {
      const ongCredentials = {
        username: "12345678901234",
        password: "senha123",
        userType: "ONG",
      }

      login.loginWithoutValidation(ongCredentials.username, ongCredentials.password);
      
      Asserts_ST00.CT04();
    });

    it("CT05: Validar Login de um Adotante com Credenciais Válidas.", () => {
      const adopterCredentials = {
        username: "",
        password: "",
        userType: "ADOPTER",
      }

      login.loginWithoutValidation(adopterCredentials.username, adopterCredentials.password);

      Asserts_ST00.CT05();
    });

    it("CT06: Validar Login de um Voluntário com Credenciais Válidas.", () => {
      const voluntaryCredentials = {
        username: "",
        password: "",
        userType: "VOLUNTARY",
      }

      login.loginWithoutValidation(voluntaryCredentials.username, voluntaryCredentials.password);
      
      Asserts_ST00.CT06();
    });
  });

  context.skip("Context 03: Validar Cenários de Login com Credenciais Incorretas", () => {
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
        username: "",
        password: "",
        userType: "ADOPTER",
      }

      login.loginWithoutValidation(adopterCredentials.username, adopterCredentials.password);

      Asserts_ST00.CT08();
    });

    it("CT09: Validar Login de um Voluntário com Credenciais Incorretas.", () => {
      const voluntaryCredentials = {
        username: "",
        password: "",
        userType: "VOLUNTARY",
      }

      login.loginWithoutValidation(voluntaryCredentials.username, voluntaryCredentials.password);
      
      Asserts_ST00.CT09();
    });
  });

  context("Context 04: Validar Redirecionamento de Links na Página de Login.", () => {
    it("CT10: Validar a funcionalidade do botão 'Cadastre-se'.", () => {
      const routeExpected = Routes.register;
  
      login.clickOnRegister();
  
      cy.url().then((routeObtained) => {
          Asserts_ST00.CT10(routeObtained, routeExpected);
      });
    });

    it.skip("CT11: Validar a funcionalidade do botão 'Recuperar Senha'.", () => {
      const routeExpected = Routes.recoverPassword;
  
      login.clickOnRecoverPassword();
  
      cy.url().then((routeObtained) => {
          Asserts_ST00.CT11(routeObtained, routeExpected);
      });
    });
  });
});
