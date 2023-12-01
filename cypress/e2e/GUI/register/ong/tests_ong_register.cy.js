// Locators and Routes
import { Routes } from "../../../../src/routes/routes";
import { locatorsOngRegister } from "../../../../src/locators/pages/register/locatorsOngRegister";

// Page Objects
import ongRegister from "../../../../src/pageObjects/ong/ongRegister";
import login from "../../../../src/pageObjects/login/login";

// Data Transfer Objects
import { ongDto } from "../../../../src/dto/ong/ongDto";

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
  });

  context("Context 02: Cenários de Sucesso de Criação de ONG.", () => {
    it("CT11: Preenchimento de Todos os Campos.", () => {
      const ongData = new ongDto();

      ongRegister.fillAllFields(ongData, true);
      ongRegister.registerOng(true);
      login.loginWithoutValidation(ongData.getCnpj(), ongData.getPassword());

      Asserts_ST03.CT11();
    });

    it("CT12: Preenchimento de Apenas os Campos Obrigatórios.", () => {
      const ongData = new ongDto();

      ongRegister.fillAllRequiredFields(ongData, true);
      ongRegister.registerOng(true);
      login.loginWithoutValidation(ongData.getCnpj(), ongData.getPassword());

      Asserts_ST03.CT12();
    });
  });

  context("Context 03: Cenários Alternativos de Criação de ONG.", () => {
    it("CT21: Tentativa de Criação de uma ONG cujo CNPJ já está vinculado à outra ONG.", () => {
      const cnpjAlreadyRegistered = "12345678901234";
      const ongData = new ongDto({cnpj: cnpjAlreadyRegistered});

      ongRegister.fillAllFields(ongData, true);
      ongRegister.registerOng(false);

      Asserts_ST03.CT21();
    });

    it("CT22: Tentativa de Criação de uma ONG cujo E-mail já está cadastrado.", () => {
      const emailAlreadyRegistered = "ac_ong_test@mailinator.com";
      const ongData = new ongDto({email: emailAlreadyRegistered});

      ongRegister.fillAllFields(ongData, true);
      ongRegister.registerOng(false);

      Asserts_ST03.CT22();
    });

    it("CT23: Tentativa de Criação de uma ONG com campos fora da Formatação Esperada.", () => {
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
