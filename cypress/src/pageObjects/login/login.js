// Locators & Routes
import { Routes } from "../../routes/routes";
import { locatorsLogin } from "../../locators/pages/login/locatorsLogin";

// Data Transfer Objects

// Components Objects 

// Utils
import { getValue, expected, elementExpected, convertToDate } from "../../util/util";
import promisify from "cypress-promise";

class login {
  constructor() {
  }

  loginWithoutValidation(userCredentials) {    
    cy.get(locatorsLogin.user).type(userCredentials.username);
    cy.get(locatorsLogin.password).type(userCredentials.password, { log: false });
    cy.get(locatorsLogin.loginButton).click();
  }

  changePasswordHiding() {
    cy.get(locatorsLogin.changePasswordHiding).click();
  }

  clickOnLoginButton() {
    cy.get(locatorsLogin.loginButton).click();
  }

  clickOnRecoverPassword() {
    cy.get(locatorsLogin.RecoverPassword).click();
  }

  clickOnSignup() {
    cy.get(locatorsLogin.signup).click();
  }
}

export default new login();
