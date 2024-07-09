Cypress.Commands.add("initializeTest", () => {
  cy.visit(Cypress.env("baseUrl"));
});

Cypress.Commands.add("Login", () => {
  const email = Cypress.env("loginEmail");
  const password = Cypress.env("loginPassword");

  // Use cy.session to cache the login state
  cy.session([email, password], () => {
    // If the user is not logged in, log them in
    cy.visit(Cypress.env("baseUrl") + "/auth/login");
    // Wait for the page to load and elements to become visible
    cy.get(".px-2:nth-child(3)").should("exist").type(email); // replace with correct selector
    cy.get(".px-2:nth-child(5)").should("exist").type(password); // replace with correct selector
    cy.get(".py-2").should("exist").click(); // replace with your login button selector

    // Verify login was successful
    cy.url().should("not.include", "/login");
  });
});
