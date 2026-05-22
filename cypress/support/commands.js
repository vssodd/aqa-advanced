Cypress.Commands.add('visitWithAuth', (path = '/') => {
  cy.visit(path, {
    auth: {
      username: Cypress.env('basicAuthUsername'),
      password: Cypress.env('basicAuthPassword'),
    },
    failOnStatusCode: false,
  });
});

/**
 * @param {{name:string, lastName:string, email:string, password:string}} user
 */
Cypress.Commands.add('register', (user) => {
  cy.visitWithAuth('/');
  cy.get('app-header header.header button.header_signin').click();
  cy.get('ngb-modal-window app-signin-modal').should('be.visible');
  cy.get('ngb-modal-window').contains('button', 'Registration').click();
  cy.get('app-signup-modal').should('be.visible');

  cy.get('#signupName').type(user.name);
  cy.get('#signupLastName').type(user.lastName);
  cy.get('#signupEmail').type(user.email);
  cy.get('#signupPassword').type(user.password, { sensitive: true });
  cy.get('#signupRepeatPassword').type(user.password, { sensitive: true });

  cy.get('app-signup-modal').contains('button', 'Register').click();
  cy.location('pathname', { timeout: 20000 }).should('include', '/panel/garage');
});

Cypress.Commands.add('login', (email, password) => {
  cy.get('app-header header.header button.header_signin').click();
  cy.get('ngb-modal-window app-signin-modal').should('be.visible');
  cy.get('ngb-modal-window #signinEmail').type(email);
  cy.get('ngb-modal-window #signinPassword').type(password, { sensitive: true });
  cy.get('ngb-modal-window').contains('button', 'Login').click();
  cy.location('pathname', { timeout: 15000 }).should('include', '/panel');
});

Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
  if (options && options.sensitive) {
    options.log = false;
    Cypress.log({
      $el: element,
      name: 'type',
      message: '*'.repeat(text.length),
    });
  }
  return originalFn(element, text, options);
});
