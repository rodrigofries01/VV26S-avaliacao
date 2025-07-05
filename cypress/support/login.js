function loginWithCredentials(username, password) {
  cy.visit("https://saucedemo.com");
  cy.get("#user-name").type(username);
  cy.get("#password").type(password);
  cy.get("#login-button").click();
}

export { loginWithCredentials };
