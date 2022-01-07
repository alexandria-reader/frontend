beforeEach(() => {
  // root-level hook
  // runs before every test block
});

describe('renders the home page', () => {
  it('renders correctly', () => {
    cy.visit('/');
  });
});

describe('can log in an existing user', () => {
  it('logs in user', () => {
    cy.visit('/login');

    cy.get('input[name="email').type('dana@example.com');
    cy.get('input[name="password').type('danapwhash');
    cy.get('button').click();

    cy.location('pathname').should('eq', '/texts');
  });
});

describe('can sign up a new user', () => {
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
