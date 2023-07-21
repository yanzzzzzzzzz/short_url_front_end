describe('test', () => {
  beforeEach(() => {
    // Visit the website's homepage
    cy.visit('http://127.0.0.1:5173/');
  });
  it('Successfully logs in and logs out', () => {
    // Click on the "Login" button, should redirect to the login page
    cy.contains('Login').click();
    cy.url().should('include', '/login');

    // Enter the username and password, then click the "Login" button
    cy.get('[data-cy="username"]').type('mluukkai');
    cy.get('[data-cy="password"]').type('salainen');
    cy.get('[data-cy="submit"]').click();

    // After successful login, it should redirect to the user page or any other success page
    // Assuming that after login, the "Logout" button will be displayed, so check if it exists
    cy.contains('Logout').click();
  });
  it('test short url', () => {
    cy.get('[data-cy="url"]').type('https://www.google.com.tw/');
    cy.get('[data-cy="shortUrl"]').click();
  });
});
