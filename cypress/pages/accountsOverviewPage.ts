export class overviewPage {
  welcomeText() {
    return cy.get(".smallText");
  }
  pageTitle() {
    return cy.get("#showOverview > .title");
  }
  accountNumber() {
    return cy.get("tbody > tr:nth-child(1) > td:nth-child(1)");
  }
  balance() {
    return cy.get("tr:nth-child(1) > td:nth-child(2)");
  }
}
