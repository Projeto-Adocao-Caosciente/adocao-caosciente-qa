// Locators and Routes
import { Routes } from "../../../src/routes/routes";

// Asserts to Suite Test 01: Visit all Routes of Application
import Asserts_ST01 from "./asserts_visit_pages";

describe("ST01: Visitar todas as páginas da aplicação.", () => {
  context("Context 01: Área não logada.", () => {
    it("CT01: Visitar a rota Login.", () => {
      const routeExpected = Routes.login;
  
      cy.visit(routeExpected);
      cy.url().then((routeObtained) => {
        Asserts_ST01.CT01(routeObtained, routeExpected);
      });
    });

    it("CT02: Visitar a rota de Cadastro.", () => {
      const routeExpected = Routes.register;
  
      cy.visit(routeExpected);
      cy.url().then((routeObtained) => {
        Asserts_ST01.CT02(routeObtained, routeExpected);
      });
    });

    it("CT03: Visitar a rota de Recuperação de Senha.", () => {
      const routeExpected = Routes.recoverPassword;
  
      cy.visit(routeExpected);
      cy.url().then((routeObtained) => {
        Asserts_ST01.CT03(routeObtained, routeExpected);
      });
    });
  });

  context("Context 02: Área logada.", () => {
    beforeEach(() => {
      cy.login();
    });

    it("CT04: Visitar a rota Home.", () => {
      const routeExpected = Routes.home;
  
      cy.visit(routeExpected);
      cy.url().then((routeObtained) => {
        Asserts_ST01.CT04(routeObtained, routeExpected);
      });
    });

    it("CT05: Visitar a rota de Detalhes da Conta.", () => {
      const routeExpected = Routes.account.details;
  
      cy.visit(routeExpected);
      cy.url().then((routeObtained) => {
        Asserts_ST01.CT05(routeObtained, routeExpected);
      });
    });

    it("CT06: Visitar a rota de Edição da Conta.", () => {
      const routeExpected = Routes.account.edit;
  
      cy.visit(routeExpected);
      cy.url().then((routeObtained) => {
        Asserts_ST01.CT06(routeObtained, routeExpected);
      });
    });

    it("CT07: Visitar a rota de Detalhes do Pet.", () => {
      const routeExpected = Routes.pet.details;
  
      cy.visit(routeExpected);
      cy.url().then((routeObtained) => {
        Asserts_ST01.CT07(routeObtained, routeExpected);
      });
    });

    it("CT08: Visitar a rota de Cadastro do Pet.", () => {
      const routeExpected = Routes.pet.register;
  
      cy.visit(routeExpected);
      cy.url().then((routeObtained) => {
        Asserts_ST01.CT08(routeObtained, routeExpected);
      });
    });

    it("CT09: Visitar a rota de Edição do Pet.", () => {
      const routeExpected = Routes.pet.edit;
  
      cy.visit(routeExpected);
      cy.url().then((routeObtained) => {
        Asserts_ST01.CT09(routeObtained, routeExpected);
      });
    });
  });
});
