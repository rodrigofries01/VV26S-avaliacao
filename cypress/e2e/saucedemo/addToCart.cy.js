import { loginWithCredentials } from '../../support/login';
import userData from '../../fixtures/userData.json';

describe('Saucedemo', () => {
  it('Adicionar ao carrinho e finalizar compra', () => {
    loginWithCredentials(userData.username, userData.password);
    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('.shopping_cart_badge').should('contain', '1');
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();
    cy.get('.shopping_cart_badge').should('contain', '2');
    cy.get('.shopping_cart_link').click();
    cy.url().should('include', '/cart.html');
    cy.get('.title').should('contain', 'Your Cart');

    // Verify items in the cart
    cy.get('.cart_item').should('have.length', 2);
    cy.get('.cart_item').eq(0).should('contain', 'Sauce Labs Backpack');
    cy.get('.cart_item').eq(1).should('contain', 'Sauce Labs Bike Light');
    cy.get('.cart_item').eq(0).find('.inventory_item_price').should('contain', '$29.99');
    cy.get('.cart_item').eq(1).find('.inventory_item_price').should('contain', '$9.99');  

    // Remove an item from the cart
    cy.get('.cart_item').eq(0).find('.cart_button').click();
    cy.get('.cart_item').should('have.length', 1);
    cy.get('.cart_item').eq(0).should('contain', 'Sauce Labs Bike Light');
    cy.get('.cart_item').eq(0).find('.inventory_item_price').should('contain', '$9.99');  

    // Proceed to checkout
    cy.get('[data-test="checkout"]').click();
    cy.url().should('include', '/checkout-step-one.html');
    cy.get('.title').should('contain', 'Checkout: Your Information');
    
    cy.get('[data-test="firstName"]').type(userData.firstName);
    cy.get('[data-test="lastName"]').type(userData.lastName);
    cy.get('[data-test="postalCode"]').type(userData.zipCode);
    cy.get('[data-test="continue"]').click();
    cy.url().should('include', '/checkout-step-two.html');
    cy.get('.title').should('contain', 'Checkout: Overview');
    
    let totalPrice = cy.get('[data-test="subtotal-label"]') + cy.get('[data-test="tax-label"]') 

    if(cy.get('[data-test="total-label"]') === (totalPrice)){
      cy.get('[data-test="finish"]').click();
      cy.url().should('include', '/checkout-complete.html');
      cy.get('.title').should('contain', 'Checkout: Complete!');
      cy.get('.complete-header').should('contain', 'Thank you for your order!');
    }

    cy.get('[data-test="finish"]').click();
    cy.url().should('include', '/checkout-complete.html');
    cy.get('.title').should('contain', 'Checkout: Complete!');
    cy.get('.complete-header').should('contain', 'Thank you for your order!');
  });
});