/// <reference types="cypress" />
import { LoginPage } from "../pages/loginPage";

const lg = new LoginPage();

describe("Login as an existing user", () => {
  before(() => {
    cy.initializeTest();
  });

  it("Click Login Button", () => {
    cy.wait(500);
    lg.loginButton().should("exist").click();
  });

  it("Enter email address", () => {
    lg.emailInput().type(Cypress.env("loginEmail"));
  });

  it("Enter password", () => {
    lg.passwordInput().type(Cypress.env("loginPassword"));
  });

  it("Click login button", () => {
    cy.wait(500);
    lg.loginButton().click();
  });

  it("Login success verify", () => {
    // Add verification steps here
  });
});
