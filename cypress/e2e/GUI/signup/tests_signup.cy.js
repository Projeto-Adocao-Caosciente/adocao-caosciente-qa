// Locators and Routes
import { Routes } from "../../../src/routes/routes";
import { locatorsSignup } from "../../../src/locators/pages/signup/locatorsSignup";
import { ongDto } from "../../../src/dto/signup/ongDto";

describe("ST00: Tiltei", () => {
  it("CT01: ", () => {
    const ong = new ongDto();
    cy.visit(Routes.signup);
    cy.get(locatorsSignup.ong.profilePhoto).attachFile(ong.getProfilePhoto());
    cy.get(locatorsSignup.ong.name).type(ong.getName());
    cy.get(locatorsSignup.ong.cnpj).type(ong.getCnpj());
    cy.get(locatorsSignup.ong.email).type(ong.getEmail());
    cy.get(locatorsSignup.ong.state).type(ong.getState());
    cy.get(locatorsSignup.ong.city).type(ong.getCity());
    cy.get(locatorsSignup.ong.phoneNumber).type(ong.getPhoneNumber());
    cy.get(locatorsSignup.ong.programsAndActivities).type(ong.getProgramsAndActivities());
    cy.get(locatorsSignup.ong.mission).type(ong.getMission());
    cy.get(locatorsSignup.ong.foundationDate).type(ong.getFoundationDate());
    cy.get(locatorsSignup.ong.password).type(ong.getPassword());
    cy.get(locatorsSignup.ong.confirmPassword).type(ong.getPassword());
  });
});
