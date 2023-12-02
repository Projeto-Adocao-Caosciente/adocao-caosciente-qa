// Locators and Routes
import { Routes } from "../../../../src/routes/routes";
import { locatorsPetRegister } from "../../../../src/locators/pages/pet/locatorsPetRegister";

// Page Objects
import petRegister from "../../../../src/pageObjects/pet/petRegister";
import petList from "../../../../src/pageObjects/pet/petList";

// Asserts to Suite Test 05: Análise do Funcionamento da Página de Cadastro de PET
import Asserts_ST05 from "./asserts_pet_register";

describe("ST05: Análise do Funcionamento da Página de Cadastro de PET", () => {
  beforeEach(() => {
    cy.login();
    cy.visit(Routes.pet.register);
  });

  context("Context 01: Testes Funcionais nos Campos na Página de Cadastro de PET", () => {
    it("CT01: Validar obrigatoriedade dos Campos.", () => {
      petRegister.clickOnRegisterButton();

      Asserts_ST05.CT01();
    });
  });

  context("Context 02: Cenários de Sucesso de Criação de PET.", () => {
    it("CT09: Preenchimento de Todos os Campos.", async () => {
      const petData = petRegister.fillAllFields(true);
      petRegister.registerPet();

      const allPets = await petList.getAllPets();

      Asserts_ST05.CT09(allPets, petData);
    });

    it("CT10: Preenchimento de Apenas os Campos Obrigatórios.", async () => {
      const petData = petRegister.fillAllRequiredFields(true);
      petRegister.registerPet();

      const allPets = await petList.getAllPets();

      Asserts_ST05.CT10(allPets, petData);
    });
  });

  context("Context 03: Cenários Alternativos de Criação de PET.", () => {
    it("CT11: Tentativa de Criação de um PET com campos fora da Formatação Esperada.", () => {});

    it("CT12: Tentativa de Criação de um PET não preenchendo Campos Obrigatórios.", () => {
      petRegister.fillNameField("PET01");
      petRegister.fillBreedField("Raça do PET01");
      petRegister.fillKindField("Tipo do PET01");
      petRegister.registerPet(false);

      Asserts_ST05.CT12();
    });
  });

  context("Context 04: Validar Redirecionamento de Links na Página de Criação de PET.", () => {
    it("CT13: Validar Redirecionamento para a Página de Listagem de Pet's Cadastrados da ONG.", () => {
      const routeExpected = Routes.home;
  
      petRegister.clickOnCancel();
  
      cy.url().then((routeObtained) => {
        Asserts_ST05.CT13(routeObtained, routeExpected);
      });
    });
  });
});
