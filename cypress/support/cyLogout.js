// Routes
import { Routes } from "@routes/routes";

// Locators
import { locatorsNavbar } from "@locators/components/locatorsNavbar";

// Utils
import { expected } from "@util/util";

/**
 * @description This method is used to logout to the application.
 *
 * @example
 * cy.logout();
 */
Cypress.Commands.add("logout", () => {
  const customSuccessMessage = "[Logout] O logout foi realizado com sucesso.";
  const customFailureMessage = "[Logout] Ocorreu um erro ao realizar o logout.";

  cy.visit("/");

  cy.get(locatorsNavbar.logoutButton).click();

  cy.clearAllCookies();
  cy.clearLocalStorage();
  cy.clearAllSessionStorage();

  cy.url().should($url => {
    expected(
      $url,
      "contains",
      "/login",
      customSuccessMessage,
      customFailureMessage
    );
  })
});
