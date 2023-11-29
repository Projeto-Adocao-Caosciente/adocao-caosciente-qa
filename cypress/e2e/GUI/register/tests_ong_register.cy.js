// Locators and Routes
import { Routes } from "../../../src/routes/routes";
import { locatorsRegister } from "../../../src/locators/pages/register/locatorsRegister";

// Page Objects
import ongRegister from "../../../src/pageObjects/register/ongRegister";
import login from "../../../src/pageObjects/login/login";

// Asserts to Suite Test 03: Análise do Funcionamento da Página de Cadastro de ONG
import Asserts_ST03 from "./asserts_ong_register";

describe("ST03: Análise do Funcionamento da Página de Cadastro de ONG", () => {
  beforeEach(() => {
    cy.visit(Routes.register.ong);
  });

  context("Context 01: Testes Funcionais nos Campos na Página de Cadastro de ONG", () => {
    it("CT01: Validar obrigatoriedade dos Campos.", () => {
      ongRegister.clickOnRegisterButton();

      Asserts_ST03.CT01();
    });

    it("CT02: Validar formato específico do campo CNPJ/CPF.", () => {
      // TODO: Change for the correct validation (11111111111111) and nothing happens 1234
      const invalidCnpj = "1234";

      ongRegister.fillCnpjField(invalidCnpj);
      ongRegister.clickOnRegisterButton();

      Asserts_ST03.CT02();
    });

    it("CT03: Validar formato específico do campo E-mail.", () => {
      const invalidEmail = "invalidEmail";

      ongRegister.fillEmailField(invalidEmail);
      ongRegister.clickOnRegisterButton();

      Asserts_ST03.CT03();
    });

    it("CT04: Validar formato específico do campo Telefone", () => {
      const invalidPhoneNumber = "1234";

      ongRegister.fillPhoneNumberField(invalidPhoneNumber);
      ongRegister.clickOnRegisterButton();

      Asserts_ST03.CT04();
    });

    it("CT05: Validar formato específico do campo Imagem da ONG", () => {
      //TODO: Add validation for profile photo
    });
  });

  context("Context 02: Cenários de Sucesso de Criação de ONG.", () => {
    it("CT11: Preenchimento de Todos os Campos.", () => {
      const ongData = ongRegister.fillAllFields(true);

      ongRegister.registerOng();
      login.loginWithoutValidation(ongData.getCnpj(), ongData.getPassword());

      Asserts_ST03.CT11();
    });

    it("CT12: Preenchimento de Apenas os Campos Obrigatórios.", () => {
      const ongData = ongRegister.fillAllRequiredFields();

      ongRegister.registerOng();
      login.loginWithoutValidation(ongData.getCnpj(), ongData.getPassword());

      Asserts_ST03.CT12();
    });
  });

  context("Context 03: Cenários Alternativos de Criação de ONG.", () => {
    it("CT21: Tentativa de Criação de uma ONG cujo CNPJ já está vinculado à outra ONG.", () => {
    });

    it("CT22: Tentativa de Criação de uma ONG cujo E-mail já está cadastrado.", () => {
    });

    it("CT23: Tentativa de Criação de uma ONG com campos fora da Formatação Esperada.", () => {
    });

    it("CT24: Tentativa de Criação de uma ONG não preenchendo Campos Obrigatórios.", () => {
    });
  });

  context("Context 04: Validar Redirecionamento de Links na Página de Criação de ONG.", () => {
    it("CT26: Validar Redirecionamento para a Página de Login.", () => {
      const routeExpected = Routes.login;
  
      ongRegister.clickOnAlreadyHaveAnAccount();
  
      cy.url().then((routeObtained) => {
          Asserts_ST03.CT31(routeObtained, routeExpected);
      });
    });
  });
});
