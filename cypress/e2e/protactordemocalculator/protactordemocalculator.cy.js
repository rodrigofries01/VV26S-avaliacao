// cypress/integration/calculator.spec.js

describe('Protractor Demo Calculator - Operações Básicas', () => {
  const CALC_APP = 'https://juliemr.github.io/protractor-demo/';

  const operations = [
    { symbol: '+', a:  3, b:  7, result:  10 },
    { symbol: '-', a: 15, b:  4, result:  11 },
    { symbol: '*', a:  6, b:  9, result:  54 },
    { symbol: '/', a: 20, b:  5, result:   4 }
  ];

  beforeEach(() => {
    cy.visit(CALC_APP);
  });

  operations.forEach(({ symbol, a, b, result }) => {
    it(`Calcula ${a} ${symbol} ${b} = ${result}`, () => {
      // Preenche os operandos
      cy.get('input[ng-model="first"]').clear().type(a);
      cy.get('input[ng-model="second"]').clear().type(b);

      // Seleciona a operação pelo símbolo
      cy.get('select[ng-model="operator"]')
        .select(symbol);

      // Executa o cálculo
      cy.get('#gobutton').click();

      // Valida o resultado exibido
      cy.get('h2.ng-binding')
        .should('have.text', String(result));
    });
  });
});
