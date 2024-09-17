export class fundTransferPage {
  NaviagationLink() {
    return cy.get("ul:nth-child(3) > li:nth-child(3) > a");
  }
  amount() {
    return cy.get("#amount");
  }

  fromAccount() {
    return cy.get("#fromAccountId");
  }

  toAccount() {
    return cy.get("#toAccountId");
  }

  transferButton() {
    return cy.get(".button:nth-child(1)");
  }

  transferConfirmation() {
    return cy.get("#showResult > :nth-child(2)");
  }
}
