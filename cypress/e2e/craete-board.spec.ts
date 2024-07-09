/// <reference types="cypress" />

describe("Create a new board", () => {
  beforeEach(() => {
    cy.initializeTest();
    cy.Login();
  });

  it("Create board", () => {
    cy.visit(Cypress.env("baseUrl") + "/boards");
    cy.get("#board > .title").should("exist").type("board-1{enter}");
  });

  it("Verify creating the board", () => {
    cy.get("").contains("board-1");
  });
});
