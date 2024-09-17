Cypress.Commands.add("initializeTest", () => {
  cy.visit(Cypress.env("baseUrl"));
});

Cypress.Commands.add("Login", () => {
  const username = Cypress.env("userName");
  const password = Cypress.env("loginPassword");

  // Use cy.session to cache the login state
  cy.session([username, password], () => {
    // If the user is not logged in, log them in
    cy.visit(Cypress.env("baseUrl") + "/parabank/index.htm");
    // Wait for the page to load and elements to become visible
    cy.get(".login:nth-child(2) > .input").should("exist").type(username); // replace with correct selector
    cy.get(".login:nth-child(4) > .input").should("exist").type(password); // replace with correct selector
    cy.get(".button:nth-child(1)").should("exist").click(); // replace with your login button selector

    // Verify login was successful
    cy.url().should("not.include", "/index.htm");
  });
});
