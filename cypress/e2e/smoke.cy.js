describe('CI smoke | qauto reachable in Docker container', () => {
  const auth = {
    username: Cypress.env('basicAuthUsername'),
    password: Cypress.env('basicAuthPassword'),
  };

  it('loads the home page and shows the Sign in button', () => {
    cy.visit('/', { auth, failOnStatusCode: false });
    cy.get('app-header header.header button.header_signin', { timeout: 15000 })
      .should('be.visible')
      .and('contain.text', 'Sign In');
  });

  it('opens the Sign in modal on header button click', () => {
    cy.visit('/', { auth, failOnStatusCode: false });
    cy.get('app-header header.header button.header_signin').click();
    cy.get('app-signin-modal').should('be.visible');
    cy.get('app-signin-modal').contains('button', 'Registration').should('be.visible');
  });
});
