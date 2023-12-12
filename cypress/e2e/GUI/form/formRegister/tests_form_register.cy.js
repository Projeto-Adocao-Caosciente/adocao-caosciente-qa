// Locators and Routes
import { Routes } from "@routes/routes";
import { ApiRoutes } from "@routes/apiRoutes";

// Page Objects
import petList from "@pageObjects/pet/petList";
import petDetails from "@pageObjects/pet/petDetails";
import petRegister from "@pageObjects/pet/petRegister";
import formRegister from "@pageObjects/form/formRegister";

// Data Transfer Objects
import { formDto } from "@dto/form/formDto";

// Asserts to Suite Test: ST09: Análise do Funcionamento da Página de Cadastro de Formulários de Adoção
import Asserts_ST09 from "./asserts_form_register";

describe("ST09: Análise do Funcionamento da Página de Cadastro de Formulários de Adoção", () => {
  /*before(() => {
    const formData = require("../../../../fixtures/form/randomData/simpleForm.json");

    cy.login();
    cy.visit(Routes.pet.register);

    petRegister.fillAllFields(true);
    petRegister.registerPet();

    petList.viewPetDetails(0);
    petDetails.clickCreateAdoptionFormButtonWhenEmptyList();

    formRegister.fillFormData(new formDto({title: formData.title, questions: formData.questions}));
  });*/

  beforeEach(() => {
    cy.login();

    cy.intercept("GET", ApiRoutes.ong.pet.getAll).as("getAllPets");
    cy.visit(Routes.home);
    cy.wait("@getAllPets");

    petList.viewPetDetails(0);
    petDetails.clickCreateAdoptionFormButton();
  });

  context("Context 01: Validar obrigatoriedade dos Campos.", () => {
    it("CT01: Validar obrigatoriedade dos Campos do Formulário.", () => {
      const formSimpleData = require("../../../../fixtures/form/randomData/simpleForm.json");
      const formData = new formDto({title: formSimpleData.title, questions: formSimpleData.questions});
      const formQuestions = formData.getQuestions();

      formRegister.fillAllQuestionsData(formQuestions);
      formRegister.clickFinishFormButtonWithoutValidation();

      Asserts_ST09.CT01();
    });

    it("CT02: Validar obrigatoriedade dos Campos do Card de Pergunta.", () => {
      formRegister.clickAddQuestionButton();
      formRegister.clickConfirmQuestionButton();

      Asserts_ST09.CT02();
    });
  });

  context("Context 02: Cenários de Sucesso de Criação de um Formulário", () => {
    it("CT11: Criação de um Formulário Completo.", async () => {
      const formData = new formDto();

      formRegister.fillFormData(formData);
      const listOfFormsAssociatedWithPet = await petDetails.getAllFormsAssociatedWithPet();

      Asserts_ST09.CT11(listOfFormsAssociatedWithPet, formData);
    });

    it("CT12: Criação de um Formulário Resumido.", async () => {
      const form = require("../../../../fixtures/form/randomData/simpleForm.json");
      const formData = new formDto({title: form.title, questions: form.questions});

      formRegister.fillFormData(formData);
      const listOfFormsAssociatedWithPet = await petDetails.getAllFormsAssociatedWithPet();

      Asserts_ST09.CT12(listOfFormsAssociatedWithPet, formData);
    });
  });

  context("Context 03: Cenários Alternativos de Criação de um Formulário", () => {});

  context("Context 04: Validar Redirecionamento de Links na Página de Criação de Formulários", () => {});

  context("Context 05: Simulação de Cenários de Falhas na Requisição", () => {});
});
