Cypress.Commands.add('visitWithAuth', (path = '/') => {
  cy.visit(path, {
    auth: {
      username: Cypress.env('basicAuthUsername'),
      password: Cypress.env('basicAuthPassword'),
    },
    failOnStatusCode: false,
  });
});

Cypress.Commands.add('register', (user) => {
  cy.visitWithAuth('/');
  cy.get('app-header header.header button.header_signin').click();
  cy.get('ngb-modal-window app-signin-modal').should('be.visible');
  cy.get('ngb-modal-window').contains('button', 'Registration').click();
  cy.get('app-signup-modal').should('be.visible');

  cy.get('#signupName').type(user.name);
  cy.get('#signupLastName').type(user.lastName);
  cy.get('#signupEmail').type(user.email);
  cy.get('#signupPassword').type(user.password);
  cy.get('#signupRepeatPassword').type(user.password);

  cy.get('app-signup-modal').contains('button', 'Register').click();
  cy.location('pathname', { timeout: 20000 }).should('include', '/panel/garage');
});
