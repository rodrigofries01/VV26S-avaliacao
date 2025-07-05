import { loginWithCredentials } from "../../support/login"
import userData from "../../fixtures/userData.json";


describe('Saucedemo', () => {
  it('Login com sucesso', () => {
    loginWithCredentials(userData.username, userData.password)
    cy.url().should('include', '/inventory.html')
    cy.get('.title').should('contain', 'Products')
  })
})