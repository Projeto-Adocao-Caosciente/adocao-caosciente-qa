// Locators and Routes
import { Routes } from "@routes/routes";

// Page Objects
import formDetails from "@pageObjects/form/formDetails"

// Data Transfer Objects
import { formDto } from "@dto/form/formDto";

// Asserts to Suite Test: ST10: Análise do Funcionamento da Página de Detalhes de um Formulário de Adoção
import Asserts_ST10 from "./asserts_form_details";

describe("ST10: Análise do Funcionamento da Página de Detalhes de um Formulário de Adoção", () => {
  // TODO: Before init, its necessary register a pet and a forms

  beforeEach(() => {
    cy.login();
    cy.visit(Routes.home);
  });

  context("Context 01: Visualização dos Formulários de Adoção", () => {
    it("CT01:", () => {});
  });

  context("Context 02: Validar Redirecionamento de Links na Página de Detalhes de um Formulário de Adoção", () => {});

  context("Context 03: Simulação de Cenários de Falhas na Requisição", () => {});
});
