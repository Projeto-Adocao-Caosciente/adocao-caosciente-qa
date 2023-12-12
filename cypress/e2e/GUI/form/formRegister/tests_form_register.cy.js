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
  before(() => {
    const formData = require("../../../../fixtures/form/randomData/simpleForm.json");

    cy.login();
    cy.visit(Routes.pet.register);

    petRegister.fillAllFields(true);
    petRegister.registerPet();

    petList.viewPetDetails(0);
    petDetails.clickCreateAdoptionFormButtonWhenEmptyList();

    formRegister.fillFormData(new formDto({formTitle: formData.title, questions: formData.questions}));
  });

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
      const formData = new formDto({formTitle: formSimpleData.title, questions: formSimpleData.questions});
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

    it("CT03: Adicionar uma pergunta em um Formulário.", () => {
      const questionIndex = 0;
      formRegister.clickAddQuestionButton();

      Asserts_ST09.CT03(questionIndex);
    });

    it("CT04: Remover uma pergunta em um Formulário.", () => {
      const questionIndex = 0;

      formRegister.clickAddQuestionButton();
      formRegister.clickDeleteQuestionButton(questionIndex);

      Asserts_ST09.CT04();
    });

    it("CT05: Adicionar uma Opção de Resposta em uma Pergunta.", () => {
      const questionIndex = 0;
      const optionIndex = 1;

      formRegister.clickAddQuestionButton();
      formRegister.clickAddOptionButton(questionIndex);

      Asserts_ST09.CT05(optionIndex);
    });

    it("CT06: Remover uma Opção de Resposta em uma Pergunta.", () => {
      const questionIndex = 0;
      const optionIndex = 0;

      formRegister.clickAddQuestionButton();
      formRegister.clickRemoveOptionButton(questionIndex, optionIndex);

      Asserts_ST09.CT06(optionIndex);
    });
  });

  context("Context 02: Cenários de Sucesso de Criação de um Formulário", () => {
    it("CT11: Criação de um Formulário Completo com Envio de E-mail para os Adotantes.", async () => {
      const formData = new formDto();

      formRegister.fillFormData(formData);
      const listOfFormsAssociatedWithPet = await petDetails.getAllFormsAssociatedWithPet();

      Asserts_ST09.CT11(listOfFormsAssociatedWithPet, formData);
    });

    it("CT12: Criação de um Formulário Resumido com Envio de E-mail para os Adotantes..", async () => {
      const form = require("../../../../fixtures/form/randomData/simpleForm.json");
      const formData = new formDto({formTitle: form.title, questions: form.questions});

      formRegister.fillFormData(formData);
      const listOfFormsAssociatedWithPet = await petDetails.getAllFormsAssociatedWithPet();

      Asserts_ST09.CT12(listOfFormsAssociatedWithPet, formData);
    });

    it("CT13: Criação de um Formulário Completo sem Envio de E-mail para os Adotantes.", async() => {
      const formData = new formDto({emailListOfAdoptersToBeSent: []});

      formRegister.fillFormData(formData);
      const listOfFormsAssociatedWithPet = await petDetails.getAllFormsAssociatedWithPet();

      Asserts_ST09.CT13(listOfFormsAssociatedWithPet, formData);
    });
  });

  context("Context 03: Cenários Alternativos de Criação de um Formulário", () => {
    it("CT21: Criação de um Formulário sem Perguntas.", () => {
      const formMockWithoutQuestions = require("../../../../fixtures/form/randomData/invalidForm/formWithoutQuestions.json");
      const formData = new formDto({formTitle: formMockWithoutQuestions.title, questions: formMockWithoutQuestions.questions});

      formRegister.fillFormTitle(formData.getFormTitle());
      formRegister.fillAllQuestionsData(formData.getQuestions());

      Asserts_ST09.CT21();
    });

    it("CT22: Criação de um Formulário que possui somente uma Opção de Resposta.", () => {
      const formMockWithOneChoice = require("../../../../fixtures/form/randomData/invalidForm/formWithOneChoice.json");
      const formData = new formDto({formTitle: formMockWithOneChoice.title, questions: formMockWithOneChoice.questions});

      formRegister.fillFormTitle(formData.getFormTitle());
      formRegister.fillAllQuestionsData(formData.getQuestions());

      Asserts_ST09.CT22();
    });

    it("CT23: Criação de um Formulário que não possui nenhuma Opção marcada como Correta.", () => {
      const formMockWithoutCorrectChoice = require("../../../../fixtures/form/randomData/invalidForm/formWithoutCorrectChoice.json");
      const formData = new formDto({formTitle: formMockWithoutCorrectChoice.title, questions: formMockWithoutCorrectChoice.questions});

      formRegister.fillFormTitle(formData.getFormTitle());
      formRegister.fillAllQuestionsData(formData.getQuestions());

      Asserts_ST09.CT23();
    });
  });

  context("Context 04: Validar Redirecionamento de Links na Página de Criação de Formulários", () => {
    it("CT31: Redirecionamento para a Página de Detalhes do Pet.", () => {
      const routeExpected = Routes.pet.details;

      formRegister.clickBackButton();

      cy.url().then((routeObtained) => {
        Asserts_ST09.CT31(routeObtained, routeExpected);
      });
    });
  });

  context("Context 05: Simulação de Cenários de Falhas na Requisição", () => {
    it("CT41: Simular uma Falha na Criação de um Formulário de Adoção.", () => {
      const mockData = require("../../../../fixtures/form/mockFormError/mockFormError.json");
      const formData = new formDto();

      const formRegisterMock = {
        method: "POST",
        url: ApiRoutes.ong.pet.form.register,
        response: mockData,
        status: 400,
      }
    
      formRegister.fillFormTitle(formData.getFormTitle());
      formRegister.fillAllQuestionsData(formData.getQuestions());
      formRegister.clickAndMockResponseFinishFormButton(formRegisterMock);

      Asserts_ST09.CT41();
    });
  });
});
