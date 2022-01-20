describe('Can get to the demo page', () => {
  it('navigates to the demo page', () => {
    cy.visit('/');
    cy.get('#open-demo-btn').click();
    cy.location('pathname').should('eq', '/demo');
    cy.get('#text-body-container').contains('La niña de los fósforos');
  });
});

describe('can click a word', () => {
  it('opens the translation component', () => {
    cy.get('[data-key="2niña"]').click();
    cy.get('#translation-component').contains('niña');
  });

  it('user can add a translation', () => {
    cy.get('#current-translations input').eq(1);
    cy.get('#new-translation').type('little girl');
    cy.get('#save-translation').click();
    cy.get('#current-translations input').eq(2);
    cy.get('#current-translations input').eq(1).should('have.value', 'little girl');
  });
});
