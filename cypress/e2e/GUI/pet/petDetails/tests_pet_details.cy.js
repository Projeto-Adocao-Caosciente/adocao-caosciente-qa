// Locators and Routes
import { Routes } from "@routes/routes";
import { ApiRoutes } from "@routes/apiRoutes";

// Page Objects
import petList from "@pageObjects/pet/petList";
import petRegister from "@pageObjects/pet/petRegister";
import petDetails from "@pageObjects/pet/petDetails"

// Data Transfer Objects
import { petDto } from "@dto/pet/petDto";

// Asserts to Suite Test: ST07: Análise do Funcionamento da Página de Detalhes de um PET
import Asserts_ST07 from "./asserts_pet_details";

describe("ST07: Análise do Funcionamento da Página de Detalhes de um PET", () => {
  // TODO: Before init, its necessary register a pet
  /*before(() => {
    cy.login();
    cy.visit(Routes.pet.register);

    const petData = petRegister.fillAllFields(true);
    petRegister.registerPet();
  })*/

  beforeEach(() => {
    cy.login();
    cy.visit(Routes.home);
  });

  context("Context 01: Visualização das Informações do PET", () => {
    it("CT01: Visualizar os detalhes de um PET", async() => {
      const petIndex = 0;

      const petCard = await petList.getPet(petIndex);
      petList.viewPetDetails(petIndex);
      const petDetailsDto = await petDetails.getPetDetails();

      Asserts_ST07.CT01(petCard, petDetailsDto);
    });

    it.only("CT02: [Mockado] Visualizar os detalhes de um PET", async () => {
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
      const routeExpected = Routes.pet.details;
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
  });

  context("Context 03: Simulação de Cenários de Falhas na Requisição", () => {});
});
