describe('login', () => {
  it('passes', () => {
    cy.visit('http://127.0.0.1:5173/');
    cy.contains('Login').click();
    cy.url().should('include', '/login');
    cy.get('[data-cy="username"]').type('mluukkai');
    cy.get('[data-cy="password"]').type('salainen');
    cy.get('[data-cy="submit"]').click();
    cy.contains('Logout').click();
  });
});
// describe('My First Test', () => {
//   it('finds the content "hype"', () => {
//     cy.visit('https://example.cypress.io');
//     cy.contains('thype');
//   });
// });
