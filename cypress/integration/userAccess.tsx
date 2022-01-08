beforeEach(() => {
  cy.visit('/login');
  cy.login('testUser@example.com', 'testpassword');
});

describe('renders the home page', () => {
  it('renders correctly', () => {
    cy.visit('/');
  });
});

xdescribe('can sign up a new user', () => {
  it('signs up new user fails because of existing email', () => {
    cy.visit('/signup');

    cy.get('input[name="username').type('dana@example.com');
    cy.get('input[name="email').type('dana@example.com');
    cy.get('input[name="password').type('danapwhash');
    cy.get('select').eq(0).select('fr');
    cy.get('select').eq(1).select('es');
    cy.get('button').click();

    cy.location('pathname').should('eq', '/signup');
  });

  it('signs up new user succeeds', () => {
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
});

describe('can log in an existing user', () => {
  it('logs in user', () => {
    cy.location('pathname').should('eq', '/texts');
  });
});

describe('can change existing user settings', () => {
  it('navigates to the settings page', () => {
    cy.get('.click-user').click();
    cy.get('.settings-key').click();
    cy.get('.loggedin-status').contains('testUser@example.com is logged in');
  });

  it('updates user info', () => {
    cy.get('.click-user').click();
    cy.get('.settings-key').click();
    cy.get('input[name="username').clear().type('testUser2');
    cy.get('.button-name-email').click();
    cy.get('.loggedin-status').contains('testUser2');
  });

  it('updates learning preferences', () => {
    cy.get('.click-user').click();
    cy.get('.settings-key').click();
    cy.get('select').eq(0).select('fr').should('have.value', 'fr');
    cy.get('select').eq(1).select('de').should('have.value', 'de');
    cy.get('.button-lang-preferences').click();
  });

  it('updates password', () => {
    cy.get('.click-user').click();
    cy.get('.settings-key').click();
    cy.get('#password').type('testpassword');
    cy.get('#password2').type('testpassword2');
    cy.get('#password3').type('testpassword2');
    cy.get('.button-password').click();
    cy.get('.password-message').contains('Password updated');
    cy.get('#password').clear().type('testpassword2');
    cy.get('#password2').clear().type('testpassword');
    cy.get('#password3').clear().type('testpassword');
    cy.get('.button-password').click();
  });
});
