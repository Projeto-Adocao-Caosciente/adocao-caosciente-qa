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

  loginWithoutValidation(username, password, userType = "ONG") {    
    cy.get(locatorsLogin.user).type(username);
    cy.get(locatorsLogin.password).type(password, { log: false });
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

  clickOnRegister() {
    cy.get(locatorsLogin.register).click();
  }
}

export default new login();
