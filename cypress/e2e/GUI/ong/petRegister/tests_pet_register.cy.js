// Locators and Routes
import { Routes } from "../../../../src/routes/routes";
import { locatorsPetRegister } from "../../../../src/locators/pages/pet/locatorsPetRegister";

// Page Objects
import petRegister from "../../../../src/pageObjects/pet/petRegister";

// Asserts to Suite Test 05: Análise do Funcionamento da Página de Cadastro de PET
import Asserts_ST05 from "./asserts_pet_register";

describe("ST05: Análise do Funcionamento da Página de Cadastro de PET", () => {
  beforeEach(() => {
    cy.login();
    cy.visit(Routes.pet.register);
  });

  it.only("teste", () => {
    petRegister.clickOnCancel()
  })

  context("Context 01: Testes Funcionais nos Campos na Página de Cadastro de PET", () => {
    it("CT01: Validar obrigatoriedade dos Campos.", () => {
      petRegister.clickOnRegisterButton();

      Asserts_ST05.CT01();
    });

    it("CT04: Validar formato específico do campo Imagem da PET", () => {
      //TODO: Add validation for profile photo
    });
  });

  context("Context 02: Cenários de Sucesso de Criação de PET.", () => {
    it("CT09: Preenchimento de Todos os Campos.", () => {
      const petData = petRegister.fillAllFields(true);

      Asserts_ST05.CT11();
    });

    it("CT10: Preenchimento de Apenas os Campos Obrigatórios.", () => {
      const petData = petRegister.fillAllRequiredFields();

      Asserts_ST05.CT12();
    });
  });

  context("Context 03: Cenários Alternativos de Criação de PET.", () => {
    it("CT11: Tentativa de Criação de um PET com campos fora da Formatação Esperada.", () => {
    });

    it("CT12: Tentativa de Criação de um PET não preenchendo Campos Obrigatórios.", () => {
    });
  });

  context("Context 04: Validar Redirecionamento de Links na Página de Criação de PET.", () => {
    it("CT13: Validar Redirecionamento para a Página de Listagem de Pet's Cadastrados da ONG.", () => {
      const routeExpected = Routes.home;
  
      petRegister.clickOnAlreadyHaveAnAccount();
  
      cy.url().then((routeObtained) => {
          Asserts_ST05.CT31(routeObtained, routeExpected);
      });
    });
  });
});
