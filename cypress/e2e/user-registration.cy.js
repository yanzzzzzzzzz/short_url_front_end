import { user, newName } from '../support/helper';
describe('user registration', () => {
  const homepage = 'http://127.0.0.1:5173/';
  beforeEach(() => {
    // Visit the website's homepage
    cy.visit(homepage);
  });
  it('Create an account', () => {
    cy.contains('Signup').click();
    cy.get('[data-cy="email"]').type(user.email);
    cy.get('[data-cy="username"').type(user.username);
    cy.get('[data-cy="password"]').type(user.password);

    cy.get('[data-cy="signup"]').click();
    cy.url().should('eq', homepage);
  });
  it('Invalid email', () => {
    cy.contains('Signup').click();
    cy.get('[data-cy="email"]').type('qweqwewe@dsfsdfsd');
    cy.get('[data-cy="username"').type('aaabcasd');
    cy.get('[data-cy="password"]').type(user.password);

    cy.get('[data-cy="signup"]').click();
    cy.contains('email is invalid');
  });
  it('Invalid name', () => {
    cy.contains('Signup').click();
    cy.get('[data-cy="email"]').type('adfsqweqwewe@gmail.com');
    cy.get('[data-cy="username"').type('123');
    cy.get('[data-cy="password"]').type(user.password);

    cy.get('[data-cy="signup"]').click();
    cy.contains('user name length need to more than 5');
  });
  it('null password', () => {
    cy.contains('Signup').click();
    cy.get('[data-cy="email"]').type('adfsqweqwewe@gmail.com');
    cy.get('[data-cy="username"').type('123asd');

    cy.get('[data-cy="signup"]').click();
    cy.contains("password can't be null");
  });
  it('password too short', () => {
    cy.contains('Signup').click();
    cy.get('[data-cy="email"]').type('adfsqweqwewe@gmail.com');
    cy.get('[data-cy="username"').type('123asd');
    cy.get('[data-cy="password"]').type('1234');

    cy.get('[data-cy="signup"]').click();
    cy.contains('password length need to more than 8');
  });
});
