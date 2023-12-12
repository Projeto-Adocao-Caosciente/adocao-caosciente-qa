// Locators and Routes
import { Routes } from "@routes/routes";
import { ApiRoutes } from "@routes/apiRoutes";

// Page Objects
import petList from "@pageObjects/pet/petList";
import petDetails from "@pageObjects/pet/petDetails"
import petRegister from "@pageObjects/pet/petRegister";
import formRegister from "@pageObjects/form/formRegister";

// Data Transfer Objects
import { petDto } from "@dto/pet/petDto";
import { formDto } from "@dto/form/formDto";

// Asserts to Suite Test: ST07: Análise do Funcionamento da Página de Detalhes de um PET
import Asserts_ST07 from "./asserts_pet_details";

describe("ST07: Análise do Funcionamento da Página de Detalhes de um PET", () => {
  before(() => {
    const formData = require("../../../../fixtures/form/randomData/simpleForm.json");

    cy.login();
    cy.visit(Routes.pet.register);

    petRegister.fillAllFields(true);
    petRegister.registerPet();

    petList.viewPetDetails(0);
    petDetails.clickCreateAdoptionFormButtonWhenEmptyList();

    formRegister.fillFormData(new formDto({title: formData.title, questions: formData.questions}));
  });

  beforeEach(() => {
    cy.login();
    cy.visit(Routes.home);
  });

  context("Context 01: Visualização das Informações do PET", () => {
    it("CT01: Visualizar os detalhes de um PET", async () => {
      const petIndex = 0;

      const petCard = await petList.getPet(petIndex);
      petList.viewPetDetails(petIndex);
      const petDetailsDto = await petDetails.getPetDetails();

      Asserts_ST07.CT01(petCard, petDetailsDto);
    });

    it("CT02: [Mockado] Visualizar os detalhes de um PET", async () => {
      const mockData = require("../../../../fixtures/pet/mockPetDetails/petDetails.json");

      const petDetailsMock = {
        method: "GET",
        url: ApiRoutes.ong.pet.getOne,
        response: mockData,
        status: 200,
      }

      petDetails.viewMockedPetDetails(petDetailsMock);

      const petDetailsDto = await petDetails.getPetDetails();
      Asserts_ST07.CT02(mockData.data, petDetailsDto);
    });
  });

  context("Context 02: Validar Redirecionamento de Links na Página de Detalhes de um PET", () => {
    it("CT11: Verificar redirecionamento para a página de criação de Formulário de Adoção", () => {
      const routeExpected = Routes.form;
      const petIndex = 0;

      petList.viewPetDetails(petIndex);
      petDetails.clickCreateAdoptionFormButton();

      cy.url().then((routeObtained) => {
        Asserts_ST07.CT11(routeObtained, routeExpected);
      });
    })

    it("CT12: Verificar redirecionamento para a página de listagem de PET's", () => {
      const routeExpected = Routes.home;
      const petIndex = 0;

      petList.viewPetDetails(petIndex);
      petDetails.clickBackButton();

      cy.url().then((routeObtained) => {
        Asserts_ST07.CT12(routeObtained, routeExpected);
      });
    });

    it("CT13: [Mockado] Verificar redirecionamento para a página de criação de Formulário de Adoção quando não existem Formulários Criados", () => {
      const routeExpected = Routes.form;
      const mockData = require("../../../../fixtures/pet/mockPetDetails/emptyListForm.json");

      const petDetailsMock = {
        method: "GET",
        url: ApiRoutes.ong.pet.form.getAll,
        response: mockData,
        status: 200,
      }

      petDetails.viewMockedPetDetails(petDetailsMock);
      petDetails.clickCreateAdoptionFormButtonWhenEmptyList();

      cy.url().then((routeObtained) => {
        Asserts_ST07.CT13(routeObtained, routeExpected);
      });
    });

    it("CT14: Verificar redirecionamento para a página de Visualização de um Formulário de Adoção", () => {
      const routeExpected = Routes.form;
      const petIndex = 0;

      petList.viewPetDetails(petIndex);
      petDetails.clickToViewFormDetails(0);

      cy.url().then((routeObtained) => {
        Asserts_ST07.CT14(routeObtained, routeExpected);
      });
    });
  });

  context("Context 03: Simulação de Cenários de Falhas na Requisição", () => {
    it("CT21: Verificar tratativa de erro ao tentar acessar a Página de Detalhes de um Animal Inexistente", () => {
      const mockData = require("../../../../fixtures/pet/mockPetDetails/errorPet.json");

      const petDetailsMock = {
        method: "GET",
        url: ApiRoutes.ong.pet.getOne,
        response: mockData,
        status: 404,
      }

      petDetails.viewMockedPetDetails(petDetailsMock);

      Asserts_ST07.CT21();
    });

    it("CT22: Verificar exibição da Página de Detalhes de um PET que não possui Formulários de Adoção", () => {
      const mockData = require("../../../../fixtures/pet/mockPetDetails/emptyListForm.json");

      const petDetailsMock = {
        method: "GET",
        url: ApiRoutes.ong.pet.form.getAll,
        response: mockData,
        status: 200,
      }

      petDetails.viewMockedPetDetails(petDetailsMock);

      Asserts_ST07.CT22();
    });

    it("CT23: Verificar exibição da Página de Detalhes de um PET quando houver falha na exibição de Formulários de Adoção", () => {
      const mockData = require("../../../../fixtures/pet/mockPetDetails/errorForm.json");

      const petDetailsMock = {
        method: "GET",
        url: ApiRoutes.ong.pet.form.getAll,
        response: mockData,
        status: 400,
      }

      petDetails.viewMockedPetDetails(petDetailsMock);

      Asserts_ST07.CT23();
    });
  });
});
