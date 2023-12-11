// Locators and Routes
import { Routes } from "@routes/routes";
import { ApiRoutes } from "@routes/apiRoutes";

// Page Objects
import petList from "@pageObjects/pet/petList";
import petRegister from "@pageObjects/pet/petRegister";
import formRegister from "@pageObjects/form/formRegister";

// Data Transfer Objects
import { formDto } from "@dto/form/formDto";

// Asserts to Suite Test: ST09: Análise do Funcionamento da Página de Cadastro de Formulários de Adoção
import Asserts_ST09 from "./asserts_form_register";

describe("ST09: Análise do Funcionamento da Página de Cadastro de Formulários de Adoção", () => {
  // TODO: Before init, its necessary register a pet
  before(() => {
    cy.login();
    cy.visit(Routes.pet.register);

    const petData = petRegister.fillAllFields(true);
    petRegister.registerPet();
  });

  beforeEach(() => {
    const petIndex = 0;

    cy.login();

    cy.intercept("GET", ApiRoutes.ong.pet.getAll).as("getAllPets");
    cy.visit(Routes.home);
    cy.wait("@getAllPets");

    petList.viewPetDetails(petIndex);
  });

  context("Context 01: Validar obrigatoriedade dos Campos.", () => {
    it("CT01:", () => {
      const formData = new formDto();
      return
      formRegister.fillFormData(formData);
    });
  });

  context("Context 02: Cenários de Sucesso de Criação de um Formulário", () => {});

  context("Context 03: Cenários Alternativos de Criação de um Formulário", () => {});

  context("Context 04: Validar Redirecionamento de Links na Página de Criação de Formulários", () => {});

  context("Context 05: Simulação de Cenários de Falhas na Requisição", () => {});
});
