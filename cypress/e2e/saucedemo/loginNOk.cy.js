import { loginWithCredentials } from "../../support/login";
import userData from "../../fixtures/userData.json";

describe("Saucedemo", () => {
  it("Login com erro", () => {
    loginWithCredentials(userData.usernameError, userData.password);
    cy.get("[data-test='error']").should("contain", "Epic sadface: Username and password do not match any user in this service");
    cy.get("#user-name").should("have.class", "input_error form_input");
  });
});
