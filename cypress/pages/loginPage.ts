export class LoginPage {
  loginButton() {
    return cy.get(".navbar > #NavigationAuth .link", { timeout: 15000 });
  }
  emailInput() {
    return cy.get("#email");
  }
  passwordInput() {
    return cy.get("#password");
  }
  loginSubmitButton() {
    return cy.get(".auth__form__submit");
  }
}
