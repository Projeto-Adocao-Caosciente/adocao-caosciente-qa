// Locators and Routes
import { Routes } from "@routes/routes";

// Page Objects
import petList from "@pageObjects/pet/petList";

// Asserts to Suite Test 05: Análise do Funcionamento da Página de Listagem de PET's
import Asserts_ST06 from "./asserts_pet_list";

describe("ST06: Análise do Funcionamento da Página de Listagem de PET's", () => {
  beforeEach(() => {
    cy.login();
    cy.visit(Routes.home);
  });

  context("Context 01: Cenário de Listagem de PET's.", () => {
    it("CT01: Verificar se a listagem de PET's está sendo exibida corretamente.", async () => {
      const allPets = await petList.getAllPets();

      Asserts_ST06.CT01(allPets);
    });

    it("CT02: [Mockado] Verificar se a listagem de PET's está sendo exibida corretamente.", () => {
      const petsListMock = [
        {
          pageRequired: 1,
          mockData: "pet/petList/page1",
          pathRequest: "ong/animals",
        },
        {
          pageRequired: 2,
          mockData: "pet/petList/page2",
          pathRequest: "ong/animals",
        },
        {
          pageRequired: 3,
          mockData: "pet/petList/page3",
          pathRequest: "ong/animals",
        },
        {
          pageRequired: 2,
          mockData: "pet/petList/page2",
          pathRequest: "ong/animals",
        },
        {
          pageRequired: 1,
          mockData: "pet/petList/page1",
          pathRequest: "ong/animals",
        },
      ];

      petList.viewAllMockPages(petsListMock);
      cy.fixture(petsListMock[0].mockData).then((data) => {
        Asserts_ST06.CT02(data);
      });
    });
  });

  context(
    "Context 02: Cenário de Comportamento dos botões de Ações nos Cards.",
    () => {
      it("CT03: Visualizar Detalhes de um PET.", async () => {
        const cardIndex = 1;

        const petCard = await petList.getPet(cardIndex);
        const petDetails = await petList.getPetDetails(cardIndex);

        Asserts_ST06.CT03(petCard, petDetails);
      });
    }
  );

  context("Context 03: Cenário de Buscas por nome de um PET", () => {
    it("CT10: [Busca Comum] Verificar se os resultados da busca condizem com o procurado (NÃO VALIDAR Case Sensitive)", async () => {
      const petName = "cachorro";

      petList.searchPet(petName);
      const campaignsList = await petList.getAllPets();

      Asserts_ST06.CT10(campaignsList, petName);
    });

    it("CT11: [Busca Comum] Verificar se os resultados da busca condizem com o procurado (VALIDAR Case Sensitive)", async () => {
      const petName = "Cachorro";
      const petNameLowerCase = petName.toLowerCase();

      petList.searchPet(petName);
      const allPets = await petList.getAllPets();

      petList.searchPet(petNameLowerCase);
      const petListNormalized = await petList.getAllPets();

      Asserts_ST06.CT11(allPets, petListNormalized, petName);
    });

    it("CT12: [Busca Comum] Verificar se os resultados da busca condizem com o procurado (VALIDAR Acentuação)", async () => {
      // This name is a pet name with accentuation
      const petName = "Gatô";
      const petNameWithoutAccentuation = "Gato";

      petList.searchPet(petName);
      const petListWithAccentuation = await petList.getAllPets();

      petList.searchPet(petNameWithoutAccentuation);
      const allPets = await petList.getAllPets();

      Asserts_ST06.CT12(allPets, petListWithAccentuation, petName);
    });

    it("CT13: [Busca Complexa] Verificar se os resultados da busca condizem com o procurado (VALIDAR Case Sensitive)", async () => {
      const petName = "Gato de Botas";
      const petNameLowerCase = petName.toLowerCase();

      petList.searchPet(petName);
      const allPets = await petList.getAllPets();

      petList.searchPet(petNameLowerCase);
      const petListNormalized = await petList.getAllPets();

      Asserts_ST06.CT13(petListNormalized, allPets, petName);
    });

    it.only("CT14: [Busca] Realizar uma busca por uma pet inexistente", async () => {
      const petName = "PQ902KD0L";

      petList.searchPet(petName);
      const listSizePets = await petList.getListSizeOfPets();
      console.log(listSizePets)

      Asserts_ST06.CT14(listSizePets);
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
