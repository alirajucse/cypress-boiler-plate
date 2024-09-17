/// <reference types="cypress" />
import { overviewPage } from "../pages/accountsOverviewPage";

const op = new overviewPage();

describe("Check the accounts", () => {
  beforeEach(() => {
    cy.initializeTest();
    cy.Login();
  });

  it("Verify welcome message & page title", () => {
    op.welcomeText().should("contain.text", "Welcome raju sdet");
    op.pageTitle().should("contain.text", "Accounts Overview");
  });
});
