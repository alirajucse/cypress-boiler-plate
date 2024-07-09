// cypress/support/index.d.ts

declare namespace Cypress {
  interface Chainable {
    initializeTest(): Chainable<void>;
    Login(): Chainable<void>;
  }
}
