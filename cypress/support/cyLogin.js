// Routes
import { Routes } from "../src/routes/routes";

// Locators
import { locatorsNavbar } from "../src/locators/components/locatorsNavbar";
import { locatorsLogin } from "../src/locators/pages/login/locatorsLogin";

// Utils
import { expected } from "../src/util/util";

/**
 * @description This method is used to login to the application. The session is validate using the local storage of the browser
 *
 * @param {string} username - Username to be used in the login
 * @param {string} password - Password to be used in the login
 * @param {string} userType - Type of user to be used in the login
 * @param {boolean} cacheSession - If true, the session will be cached and will not be necessary to login again
 *
 * @example
 * cy.login("username", "password");
 */
Cypress.Commands.add(
  "login",
  (
    username = Cypress.env("username"),
    password = Cypress.env("password"),
    userType = Cypress.env("userType"),
    { cacheSession = true } = {}
  ) => {
    const login = () => {
      cy.visit(Routes.login);

      cy.get(locatorsLogin.user).type(username);
      cy.get(locatorsLogin.password).type(password, { log: false });
      cy.get(locatorsLogin.loginButton).click();

      // These checks must be evaluated according to the application and may be optional for specific applications.
      cy.checkLoggedRoute(userType);
      // TODO: FIX THIS CODE
      //cy.checkUserProfile(userType);
    };

    const validate = () => {
      cy.wait(4000);

      // This method is called to validate the session, if it is valid, it will not be necessary to login again
      cy.getCookie("token").should("exist");
      cy.getLocalStorage("user").should("exist");
    };

    const options = {
      cacheAcrossSpecs: true,
      validate,
    };

    if (cacheSession) {
      cy.session(username, login, options);
      return;
    }

    login();
  }
);

/**
 * @description This method is used to verify that after logging in, the user is redirected to the correct route based on their profile/access permissions.
 * 
 * @param {string} userType - Type of user to be used in the login
 * @param {string} customSuccessMessage - Custom success message
 * @param {string} customFailureMessage - Custom failure message
 * @param {number} timeout - Timeout (in ms) to check if the user is authenticated
 * 
 * @example
 * cy.checkLoggedRoute("admin");
 */
Cypress.Commands.add(
  "checkLoggedRoute",
  (
    userType = Cypress.env("userType"),
    customSuccessMessage = null,
    customFailureMessage = null,
    timeout = 5000
  ) => {
    // TODO: Fix this assertion for the assert a specific attribute
    const routeExpected = Routes.home;

    const customSuccessMessageDefault = customSuccessMessage
      ? customSuccessMessage
      : `[Login] O usuário foi redirecionado para a rota correta: ${routeExpected}.`;

    const customFailureMessageDefault = customFailureMessage
      ? customFailureMessage
      : `[Login] Houve um erro ao redirecionar o usuário para a rota correta: ${routeExpected}.`;

    cy.url({ timeout: timeout }).should($url => {
      expected(
        $url,
        "contains",
        routeExpected,
        customSuccessMessageDefault,
        customFailureMessageDefault
      );
    })
  }
);

/**
 * @description This method is used to check if the user is authenticated.
 *
 * @param {string} usernameExpected - Name of the user expected to be authenticated
 * @param {string} customSuccessMessage - Custom success message
 * @param {string} customFailureMessage - Custom failure message
 * @param {number} timeout - Timeout (in ms) to check if the user is authenticated
 */
Cypress.Commands.add(
  "checkAuthentication",
  (
    usernameExpected,
    customSuccessMessage = null,
    customFailureMessage = null,
    timeout = 5000
  ) => {
    cy.getText(locatorsNavbar.userInfo, { timeout: timeout }).then((text) => {
      expected(
        text,
        "equal",
        usernameExpected,
        customSuccessMessage,
        customFailureMessage
      );
    });
  }
);
