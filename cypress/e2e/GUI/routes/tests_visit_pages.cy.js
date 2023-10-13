// Locators and Routes
import { Routes } from "../../../src/routes/routes";

// Asserts to Suite Test 01: Visit all Routes of Application
import Asserts_ST01 from "./asserts_visit_pages";

describe("ST01: Visitar todas as páginas da aplicação.", () => {
  beforeEach(() => {
  });

  it("CT01: Visitar a rota Home.", () => {
    const routeExpected = Routes.home;

    cy.visit(routeExpected);
    cy.url().then((routeObtained) => {
      Asserts_ST01.CT01(routeObtained, routeExpected);
    });
  });
});
