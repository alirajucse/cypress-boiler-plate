// cypress/support/e2e.js
import "./commands";
import "cypress-mochawesome-reporter/register";

// Optionally, add more global configuration or behavior here
// For example:
Cypress.on("window:before:load", (win) => {
  // do something before loading the window
});
