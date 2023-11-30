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

  loginWithoutValidation(username, password) {    
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

  clickOnRegisterOng() {
    cy.get(locatorsLogin.register.ong).click();
  }

  clickOnRegisterAdopter() {
    cy.get(locatorsLogin.register.adopter).click();
  }
}

export default new login();
