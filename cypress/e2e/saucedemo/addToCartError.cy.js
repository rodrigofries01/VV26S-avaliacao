import { loginWithCredentials } from '../../support/login';
import userData from '../../fixtures/userData.json';

describe('Saucedemo - Fluxo com erros', () => {
  it('Adicionar ao carrinho com erro', () => {
    cy.visit('https://www.saucedemo.com/');
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').should('not.exist');
    cy.get('[data-test="login-button"]').should('exist');
  });

  it('Erro ao finalizar compra', () => {
    loginWithCredentials(userData.username, userData.password);
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('.shopping_cart_link').click();
    cy.get('[data-test="checkout"]').click();
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="error"]').should('contain', 'Error: First Name is required');
    cy.get('[data-test="firstName"]').type(userData.firstName);
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="error"]').should('contain', 'Error: Last Name is required');
    cy.get('[data-test="lastName"]').type(userData.lastName);
    cy.get('[data-test="continue"]').click();
    cy.get('[data-test="error"]').should('contain', 'Error: Postal Code is required');
  });
});
