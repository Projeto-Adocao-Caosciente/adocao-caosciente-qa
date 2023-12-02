// Locators and Routes
import { Routes } from "../../../../src/routes/routes";
import { locatorsAdopterRegister } from "../../../../src/locators/pages/register/locatorsAdopterRegister";

// Page Objects
import adopterRegister from "../../../../src/pageObjects/adopter/adopterRegister";
import login from "../../../../src/pageObjects/login/login";

// Data Transfer Objects
import { adopterDto } from "../../../../src/dto/adopter/adopterDto";

// Asserts to Suite Test 03: Análise do Funcionamento da Página de Cadastro de Adotante
import Asserts_ST07 from "./asserts_adopter_register";

describe("ST03: Análise do Funcionamento da Página de Cadastro de Adotante", () => {
  beforeEach(() => {
    cy.visit(Routes.register.adopter);
  });

  context("Context 01: Testes Funcionais nos Campos na Página de Cadastro de Adotante", () => {
    it("CT01: Validar obrigatoriedade dos Campos.", () => {
      adopterRegister.clickOnRegisterButton();

      Asserts_ST07.CT01();
    });

    it("CT02: Validar formato específico do campo CPF.", () => {
      const invalidCpf = "1234";

      adopterRegister.fillCpfField(invalidCpf);
      adopterRegister.clickOnRegisterButton();

      Asserts_ST07.CT02();
    });

    it("CT03: Validar formato específico do campo Telefone", () => {
      const invalidPhoneNumber = "1234";

      adopterRegister.fillPhoneNumberField(invalidPhoneNumber);
      adopterRegister.clickOnRegisterButton();

      Asserts_ST07.CT03();
    });
  });

  context("Context 02: Cenários de Sucesso de Criação de Adotante.", () => {
    it("CT11: Preenchimento de Todos os Campos.", () => {
      const adopterData = new adopterDto();

      adopterRegister.fillAllFields(adopterData);
      adopterRegister.registerAdopter();

      login.loginWithoutValidation(adopterData.getCpf(), adopterData.getPassword());

      Asserts_ST07.CT11();
    });

    it("CT12: Preenchimento de Apenas os Campos Obrigatórios.", () => {
      const adopterData = new adopterDto();

      adopterRegister.fillAllRequiredFields(adopterData);
      adopterRegister.registerAdopter();
      login.loginWithoutValidation(adopterData.getCpf(), adopterData.getPassword());

      Asserts_ST07.CT12();
    });
  });

  context("Context 03: Cenários Alternativos de Criação de Adotante.", () => {
    it("CT21: Tentativa de Criação de uma adopter cujo CPF já está vinculado à outra adopter.", () => {
      const cpfAlreadyRegistered = "37139142815";
      const adopterData = new adopterDto({cpf: cpfAlreadyRegistered});

      adopterRegister.fillAllFields(adopterData);
      adopterRegister.registerAdopter(false);

      Asserts_ST07.CT21();
    });

    it("CT22: Tentativa de Criação de uma adopter cujo E-mail já está cadastrado.", () => {
      const emailAlreadyRegistered = "ac_adopter_test0@mailinator.com";
      const adopterData = new adopterDto({email: emailAlreadyRegistered});

      adopterRegister.fillAllFields(adopterData);
      adopterRegister.registerAdopter(false);

      Asserts_ST07.CT22();
    });

    it("CT23: Tentativa de Criação de uma adopter com campos fora da Formatação Esperada.", () => {
      const invalidName = "A";
      const invalidCpf = "1234";
      const invalidEmail = "invalidEmail@"
      const invalidPhoneNumber = "1234";
      const invalidAddress = "A";
      const invalidCep = "1234";
      const invalidCity = "A";
      const invalidState = "A";
      const invalidPassword = "12";

      const adopterData = new adopterDto({
        name: invalidName,
        cpf: invalidCpf,
        email: invalidEmail,
        phoneNumber: invalidPhoneNumber,
        address: invalidAddress,
        cep: invalidCep,
        city: invalidCity,
        state: invalidState,
        password: invalidPassword,
      });

      adopterRegister.fillAllFields(adopterData);
      adopterRegister.registerAdopter(false);

      Asserts_ST07.CT23();
    });
  });

  context("Context 04: Validar Redirecionamento de Links na Página de Criação de Adotante.", () => {
    it("CT26: Validar Redirecionamento para a Página de Login.", () => {
      const routeExpected = Routes.login;
  
      adopterRegister.clickOnAlreadyHaveAnAccount();
  
      cy.url().then((routeObtained) => {
          Asserts_ST07.CT31(routeObtained, routeExpected);
      });
    });
  });
});
