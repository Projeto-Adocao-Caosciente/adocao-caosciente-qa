// Locators and Routes
import { Routes } from "@routes/routes";
import { ApiRoutes } from "@routes/apiRoutes";

// Page Objects
import petList from "@pageObjects/pet/petList";
import petDetails from "@pageObjects/pet/petDetails";
import petRegister from "@pageObjects/pet/petRegister";
import formDetails from "@pageObjects/form/formDetails";
import formRegister from "@pageObjects/form/formRegister";

// Data Transfer Objects
import { formDto } from "@dto/form/formDto";

// Asserts to Suite Test: ST10: Análise do Funcionamento da Página de Detalhes de um Formulário de Adoção
import Asserts_ST10 from "./asserts_form_details";

describe("ST10: Análise do Funcionamento da Página de Detalhes de um Formulário de Adoção", () => {
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
  });
  context(
    "Context 01: Visualização das Informações de um Formulário de Adoção",
    () => {
      it("CT01: Visualizar os detalhes de um Formulário de Adoção", () => {
        new Cypress.Promise(async (resolve) => {
          const formDetailsIndex = 0;

          const formName = await petDetails.getOneFormAssociatedWithPet(
            formDetailsIndex
          );
          await petDetails.clickToViewFormDetails(formDetailsIndex);
          const formDetailsDto = await formDetails.getFormDetails();
  
          Asserts_ST10.CT01(formName, formDetailsDto);
        });
      });

      it("CT02: [Mockado] Visualizar os detalhes de um Formulário de Adoção", () => {
        new Cypress.Promise(async (resolve) => {
          const formIndex = 0;
          const mockListFormData = require("../../../../fixtures/form/mockFormList/mockFormList.json");
          const mockFormData = require("../../../../fixtures/form//mockFormDetails/formDetails.json");
  
          const formListMock = {
            method: "GET",
            url: ApiRoutes.ong.pet.form.getAll,
            response: mockListFormData,
            status: 200,
          };
  
          const formDetailsMock = {
            method: "GET",
            url: ApiRoutes.ong.pet.form.getOne,
            response: mockFormData,
            status: 200,
          };
  
          cy.visit(Routes.home);
  
          petDetails.viewMockedFormList(formListMock);
          petDetails.viewMockedFormDetails(formDetailsMock, formIndex);
          const formDetailsDto = await formDetails.getFormDetails();
  
          Asserts_ST10.CT02(mockFormData.data, formDetailsDto);
        });
      });

      it.skip("CT03: Enviar o convite de adoção para uma lista de E-mails de adotantes", () => {
        const formDetailsIndex = 0;
        const emailListOfAdoptersToBeSent = ["ac_adopter_quinn@mailinator.com", "ac_adopter_gnar@mailinator.com"];
        
        petDetails.clickToViewFormDetails(formDetailsIndex);
        formDetails.fillSendEmailDialog(emailListOfAdoptersToBeSent);

        Asserts_ST10.CT03(emailListOfAdoptersToBeSent);
      });

      it("CT04: Enviar o convite de adoção para um Adotante específico.", () => {
        const formDetailsIndex = 0;
        const emailListOfAdoptersToBeSent = ["ac_adopter_gnar@mailinator.com"];
        
        petDetails.clickToViewFormDetails(formDetailsIndex);
        formDetails.fillSendEmailDialog(emailListOfAdoptersToBeSent);

        Asserts_ST10.CT04(emailListOfAdoptersToBeSent);
      });
    }
  );

  context(
    "Context 02: Validar Redirecionamento de Links na Página de Detalhes de um Formulário de Adoção",
    () => {
      it("CT05: Redirecionar para a página de Detalhes do PET ao clicar no botão Voltar", () => {
        const routeExpected = Routes.pet.details;
        const formDetailsIndex = 0;

        petDetails.clickToViewFormDetails(formDetailsIndex);
        formDetails.clickToBackToPetDetails();

        cy.url().then((url) => {
          Asserts_ST10.CT05(url, routeExpected);
        });
      });

      it("CT06: Verificar fechamento do Dialog de envio de e-mails ao clicar no botão Voltar", () => {
        const formDetailsIndex = 0;
        const emailListOfAdoptersToBeSent = [];

        petDetails.clickToViewFormDetails(formDetailsIndex);
        formDetails.fillSendEmailDialog(emailListOfAdoptersToBeSent);

        Asserts_ST10.CT06();
      });
    }
  );

  context(
    "Context 03: Simulação de Cenários de Falhas na Requisição",
    () => {
      it("CT11: Verificar tratamento de erro ao tentar visualizar os detalhes de um Formulário de Adoção inexistente", () => {
        const formIndex = 0;
        const mockFormData = require("../../../../fixtures/form/mockFormDetails/errorForm.json");

        const formDetailsMock = {
          method: "GET",
          url: ApiRoutes.ong.pet.form.getOne,
          response: mockFormData,
          status: 400,
        };

        petDetails.viewMockedFormDetails(formDetailsMock, formIndex);

        Asserts_ST10.CT11();
      });
    }
  );
});
