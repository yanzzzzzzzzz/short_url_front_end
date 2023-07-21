describe('test', () => {
  it('Successfully logs in and logs out', () => {
    // Visit the website's homepage
    cy.visit('http://127.0.0.1:5173/');

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
});
