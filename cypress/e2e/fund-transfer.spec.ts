/// <reference types="cypress" />
import { fundTransferPage } from "../pages/fundTransferPage";

const ft = new fundTransferPage();

describe("Verify the successful fund transfer", () => {
  beforeEach(() => {
    cy.initializeTest();
    cy.Login();
  });

  it("Fund transfer & verify", () => {
      ft.NaviagationLink().first().click();
      ft.amount().clear().type('10');
      ft.fromAccount().select(0);
      ft.toAccount().select(1);
      ft.transferButton().click();
      ft.transferConfirmation().should('contain.text', '$10.00 has been transferred from account #15120 to account #16230.');
  });
    
});
