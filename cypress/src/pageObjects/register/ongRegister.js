// Locators & Routes
import { Routes } from "../../routes/routes";
import { locatorsRegister } from "../../locators/pages/register/locatorsRegister";

// Data Transfer Objects
import { ongDto } from "../../dto/register/ongDto";

// Components Objects 

// Utils
import { getValue, expected, elementExpected, convertToDate } from "../../util/util";
import promisify from "cypress-promise";

class ongRegister {
  constructor() {
  }

  fillAllFields(uploadImage = false) {
   const ongData = new ongDto();

    if (uploadImage) {
        cy.get(locatorsRegister.ong.profilePhoto).attachFile(ongData.getProfilePhoto());
    }
 
    cy.get(locatorsRegister.ong.name).type(ongData.getName());
    cy.get(locatorsRegister.ong.cnpj).type(ongData.getCnpj());
    cy.get(locatorsRegister.ong.email).type(ongData.getEmail());
    cy.get(locatorsRegister.ong.state).type(ongData.getState());
    cy.get(locatorsRegister.ong.city).type(ongData.getCity());
    cy.get(locatorsRegister.ong.phoneNumber).type(ongData.getPhoneNumber());
    cy.get(locatorsRegister.ong.programsAndActivities).type(ongData.getProgramsAndActivities());
    cy.get(locatorsRegister.ong.mission).type(ongData.getMission());
    cy.get(locatorsRegister.ong.foundationDate).type(ongData.getFoundationDate());
    cy.get(locatorsRegister.ong.password).type(ongData.getPassword());
    cy.get(locatorsRegister.ong.confirmPassword).type(ongData.getPassword());
    
    return ongData;
  }

  fillAllRequiredFields() {
    const ongData = new ongDto();

    cy.get(locatorsRegister.ong.name).type(ongData.getName());
    cy.get(locatorsRegister.ong.cnpj).type(ongData.getCnpj());
    cy.get(locatorsRegister.ong.email).type(ongData.getEmail());
    cy.get(locatorsRegister.ong.state).type(ongData.getState());
    cy.get(locatorsRegister.ong.city).type(ongData.getCity());
    cy.get(locatorsRegister.ong.phoneNumber).type(ongData.getPhoneNumber());
    cy.get(locatorsRegister.ong.password).type(ongData.getPassword());
    cy.get(locatorsRegister.ong.confirmPassword).type(ongData.getPassword());

    return ongData;
  }

  registerOng() {
    cy.get(locatorsRegister.navigation.registerButton).click();
  }

  clickOnAlreadyHaveAnAccount() {
    cy.get(locatorsRegister.navigation.alreadyHaveAnAccount).click();  
  }


}

export default new ongRegister();
