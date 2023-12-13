// Locators and Routes
import { Routes } from "@routes/routes";
import { ApiRoutes } from "@routes/apiRoutes";

// Page Objects
import petList from "@pageObjects/pet/petList";
import petDetails from "@pageObjects/pet/petDetails";

// Asserts to Suite Test 06: Análise do Funcionamento da Página de Listagem de PET's
import Asserts_ST06 from "./asserts_pet_list";

describe("ST06: Análise do Funcionamento da Página de Listagem de PET's", () => {
  beforeEach(() => {
    cy.login();

    cy.intercept("GET", ApiRoutes.ong.pet.getAll).as("getAllPets");
    cy.visit(Routes.home);
    cy.wait("@getAllPets");
  });

  context("Context 01: Cenário de Listagem de PET's.", () => {
    it("CT01: Verificar se a listagem de PET's está sendo exibida corretamente.", () => {
      new Cypress.Promise(async (resolve) => {
        const allPets = await petList.getAllPets();

        Asserts_ST06.CT01(allPets);
      });
    });

    it("CT02: [Mockado] Verificar se a listagem de PET's está sendo exibida corretamente.", () => {
      const petsListMock = [
        {
          pageRequired: 1,
          mockData: "pet/mockPetList/page1",
          pathRequest: ApiRoutes.ong.pet.getAll,
        },
      ];

      petList.viewAllMockPages(petsListMock);
      cy.fixture(petsListMock[0].mockData).then((data) => {
        Asserts_ST06.CT02(data);
      });
    });

    it("CT03: [Mockado] Verificar Empty State da Listagem de Pet's", () => {
      const petsListMock = [
        {
          pageRequired: 1,
          mockData: "pet/mockPetList/emptyList",
          pathRequest: ApiRoutes.ong.pet.getAll,
        },
      ];

      petList.viewAllMockPages(petsListMock);
      Asserts_ST06.CT03();
    });

    it("CT04: [Mockado] Verificar Tratativa de Erro na exibição da Listagem de Pet's", () => {
      const requestParameters = {
        method: "GET",
        url: ApiRoutes.ong.pet.getAll,
        response: { data: "sample response" },
        status: 400,
      };

      cy.interceptRequest(requestParameters, { name: "reload" });

      Asserts_ST06.CT04();
    });
  });

  context(
    "Context 02: Cenário de Comportamento dos botões de Ações nos Cards.",
    () => {
      it("CT05: Visualizar Detalhes de um PET.", () => {
        new Cypress.Promise(async (resolve) => {
          const cardIndex = 1;

          const petCard = await petList.getPet(cardIndex);
          petList.viewPetDetails(cardIndex);
          const petDetailsDto = await petDetails.getPetDetails();

          Asserts_ST06.CT05(petCard, petDetailsDto);
        });
      });
    }
  );

  context("Context 03: Cenário de Buscas por nome de um PET", () => {
    it("CT10: [Busca Comum] Verificar se os resultados da busca condizem com o procurado (NÃO VALIDAR Case Sensitive)", () => {
      new Cypress.Promise(async (resolve) => {
        const petName = "cachorro";

        petList.searchPet(petName);
        const allPets = await petList.getAllPets();

        Asserts_ST06.CT10(allPets, petName);
      });
    });

    it("CT11: [Busca Comum] Verificar se os resultados da busca condizem com o procurado (VALIDAR Case Sensitive)", () => {
      new Cypress.Promise(async (resolve) => {
        const petName = "Cachorro";
        const petNameLowerCase = petName.toLowerCase();

        petList.searchPet(petName);
        const allPets = await petList.getAllPets();

        petList.searchPet(petNameLowerCase);
        const petListNormalized = await petList.getAllPets();

        Asserts_ST06.CT11(allPets, petListNormalized, petName);
      });
    });

    it("CT12: [Busca Comum] Verificar se os resultados da busca condizem com o procurado (VALIDAR Acentuação)", () => {
      new Cypress.Promise(async (resolve) => {
        const petName = "Gatô";
        const petNameWithoutAccentuation = "Gato";

        petList.searchPet(petName);
        const petListWithAccentuation = await petList.getAllPets();

        petList.searchPet(petNameWithoutAccentuation);
        const allPets = await petList.getAllPets();

        Asserts_ST06.CT12(allPets, petListWithAccentuation, petName);
      });
    });

    it.skip("CT13: [Busca Complexa] Verificar se os resultados da busca condizem com o procurado (VALIDAR Case Sensitive)", () => {
      new Cypress.Promise(async (resolve) => {
        const petName = "Gato de Botas";
        const petNameLowerCase = petName.toLowerCase();

        petList.searchPet(petName);
        const allPets = await petList.getAllPets();

        petList.searchPet(petNameLowerCase);
        const petListNormalized = await petList.getAllPets();

        Asserts_ST06.CT13(petListNormalized, allPets, petName);
      });
    });

    it("CT14: [Busca] Realizar uma busca por uma pet inexistente", () => {
      const petName = "PQ902KD0L";

      petList.searchPet(petName);

      Asserts_ST06.CT14();
    });
  });

  context(
    "Context 04: Validar Redirecionamento de Links na Página de Listagem de PET.",
    () => {
      it("CT07: Redirecionar para a Página de Cadastro de PET.", () => {
        const routeExpected = Routes.pet.register;
        petList.registerPet();

        cy.url().then((routeObtained) => {
          Asserts_ST06.CT07(routeObtained, routeExpected);
        });
      });
    }
  );
});
