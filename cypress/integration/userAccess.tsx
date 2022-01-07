beforeEach(() => {
  Cypress.Cookies.preserveOnce('alexandria-user-token');
});

describe('renders the home page', () => {
  it.skip('renders correctly', () => {
    cy.visit('/');
  });
});

describe('can sign up a new user', () => {
  it.skip('signs up new user fails because of existing email', () => {
    cy.visit('/signup');

    cy.get('input[name="username').type('dana@example.com');
    cy.get('input[name="email').type('dana@example.com');
    cy.get('input[name="password').type('danapwhash');
    cy.get('select').eq(0).select('fr');
    cy.get('select').eq(1).select('es');
    cy.get('button').click();

    cy.location('pathname').should('eq', '/signup');
  });

  it.skip('signs up new user succeeds', () => {
    cy.visit('/signup');

    const newUserName = `${Array(4).fill(0).map((_num) => Math.random().toString(36).charAt(2)).join('')}@example.com`;
    const newPassword = Array(7).fill(0).map((_num) => Math.random().toString(36).charAt(2)).join('');
    cy.get('input[name="username').type('newUser');
    cy.get('input[name="email').type(newUserName);
    cy.get('input[name="password').type(newPassword);
    cy.get('select').eq(0).select('fr');
    cy.get('select').eq(1).select('es');
    cy.get('button').click();

    cy.location('pathname').should('eq', '/signup');
  });

  describe('can log in an existing user', () => {
    it.skip('logs in user', () => {
      cy.visit('/login');
      cy.login('testUser@example.com', 'testpassword');
      cy.location('pathname').should('eq', '/texts');
    });

    it('navigates to the settings page', () => {
      cy.visit('/login');
      cy.login('testUser@example.com', 'testpassword');
      cy.get('.click-user').click();
      cy.get('.settings-key').click();
      cy.get('.loggedin-status').contains('testUser at testUser@example.com is logged in');
    });

    it('updates user info', () => {
      cy.get('input[name="username').type('2');
      cy.get('.button-name-email').click();
      // cy.get('.button-name-email').click();
      // cy.get('.loggedin-status').contains('newUser2');
    });

    it.skip('updates language preferences', async () => {
    });
  });
});
