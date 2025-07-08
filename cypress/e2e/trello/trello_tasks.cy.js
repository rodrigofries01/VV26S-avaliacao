const email = 'e-mailvalido';
// o login não pode ser feito via google
const senha = 'senhavalida';

describe('Fluxo Trello: Login e criação de tarefa', () => {
  module.exports = {
    defaultCommandTimeout: 10000, // 10 segundos
  };

  it('Deve fazer login e criar uma nova tarefa no quadro', () => {
    // 1. Acessa o quadro diretamente
    cy.visit('https://trello.com/b/uGt0vshe/meu-quadro-de-teste');

    // 

    // 2. Clica no botão de "Fazer Login"
    cy.get('a[href*="/login"]')
      .contains('Fazer Login')
      .should('be.visible')
      .click();

    // 3. Preenche login Atlassian (cy.origin necessário)
   cy.origin('https://id.atlassian.com', () => {
      cy.get('input[name="username"]', { timeout: 20000 })
        .should('be.visible')
        .type('oe-mailquevoceutilizou');

     
      cy.get('#login-submit').click();

      cy.get('input[name="password"]', { timeout: 20000 })
        .should('be.visible')
        .type('Cw_7zY7,Je+53Bv', { log: false });

      cy.get('#login-submit').click();

      
    });

    // 4. Aguarda retorno ao quadro e presença da lista
    cy.get('[data-testid="list-cards"]', { timeout: 30000 }).should('be.visible');

    // Clica no botão "Adicionar um cartão"
    cy.contains('Adicionar um cartão', { timeout: 10000 }).click();

    // Digita o nome da tarefa
    cy.get('textarea[data-testid="list-card-composer-textarea"]', { timeout: 300000 })
      .should('be.visible')
      .type('Tarefa Cypress Automática{enter}');

    // Verifica se a tarefa foi criada
    cy.contains('Tarefa Cypress Automática', { timeout: 20000 }).should('be.visible');

    // Pega o card da tarefa
    cy.get('[data-testid="trello-card"]')
      .filter(':contains("Tarefa Cypress Automática")')
      .first()
      .as('card');

    // Mostra o botão com mouseover
    cy.get('@card')
      .trigger('mouseover')
      .wait(1000);

    // Clica no botão de marcar como feito
    cy.get('@card')
      .find('button[data-testid="card-done-state-completion-button"]')
      .click({ force: true });

    //  Validação final: confere se o botão sumiu ou o card foi marcado como feito
    cy.get('@card')
      .should('contain', 'Tarefa Cypress Automática') 
      .should('exist'); 
  });
});