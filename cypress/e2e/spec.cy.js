describe('test', () => {
  beforeEach(() => {
    // Visit the website's homepage
    cy.visit('http://127.0.0.1:5173/');
  });
  it('Successfully logs in and logs out', () => {
    cy.contains('Login').click();
    cy.url().should('include', '/login');

    cy.get('[data-cy="email"]').type('123@email.com');
    cy.get('[data-cy="password"]').type('salainen');
    cy.get('[data-cy="login"]').click();

    cy.contains('Logout').click();
  });
  it('test short url and find it then delete it', () => {
    const testUrl = 'https://www.google.com.tw/';
    cy.get('[data-cy="urlInputText"]').type(testUrl);
    cy.get('[data-cy="shortUrl"]').click();
    cy.contains(testUrl)
      .parents('[data-pc-name="panel"]')
      .within(() => {
        cy.get('[data-cy="deleteUrl"]').click();
      });
  });
});
