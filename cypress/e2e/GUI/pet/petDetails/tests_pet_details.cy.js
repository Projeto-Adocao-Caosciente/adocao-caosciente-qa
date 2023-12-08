// Locators and Routes
import { Routes } from "@routes/routes";

// Page Objects
import petDetails from "@pageObjects/pet/petDetails"

// Data Transfer Objects
import { petDto } from "@dto/pet/petDto";

// Asserts to Suite Test: ST07: Análise do Funcionamento da Página de Detalhes de um PET
import Asserts_ST07 from "./asserts_pet_details";

describe("ST07: Análise do Funcionamento da Página de Detalhes de um PET", () => {
  // TODO: Before init, its necessary register a pet

  beforeEach(() => {
    cy.login();
    cy.visit(Routes.home);
  });

  context("Context 01: Visualização das Informações do PET", () => {
    it("CT01:", () => {});
  });

  context("Context 02: Validar Redirecionamento de Links na Página de Detalhes de um PET", () => {});

  context("Context 03: Simulação de Cenários de Falhas na Requisição", () => {});
});
