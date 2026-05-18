// =============================================================================
// Custom commands & overrides
// =============================================================================

/**
 * Visit any path on the SUT with HTTP Basic Auth applied automatically.
 * Reads credentials from cypress.env.json (basicAuthUsername / basicAuthPassword).
 * @param {string} path absolute URL path or full URL
 */
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
 * Log in to the application through the UI:
 *   1. Open Sign In modal
 *   2. Type email and password (password is masked in Cypress logs)
 *   3. Click Login button
 *   4. Wait until the user lands on /panel/*
 *
 * @param {string} email     user email
 * @param {string} password  user password (will appear as **** in logs)
 */
Cypress.Commands.add('login', (email, password) => {
  cy.get('app-header header.header button.header_signin').click();
  cy.get('ngb-modal-window app-signin-modal').should('be.visible');
  cy.get('ngb-modal-window #signinEmail').type(email);
  cy.get('ngb-modal-window #signinPassword').type(password, { sensitive: true });
  cy.get('ngb-modal-window').contains('button', 'Login').click();
  cy.location('pathname', { timeout: 15000 }).should('include', '/panel');
});

/**
 * Overwrite the built-in `type` command.
 * When `{ sensitive: true }` is passed, the original Cypress log is suppressed
 * and a replacement log entry is emitted with the password masked as *****.
 *
 * Usage:
 *   cy.get('#password').type('superSecret123', { sensitive: true });
 */
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
