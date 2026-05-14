// Custom Cypress commands shared across specs.

/**
 * Visit any path on the SUT with HTTP Basic Auth applied automatically.
 * Reads credentials from cypress.env.json (basicAuthUsername / basicAuthPassword).
 * @param {string} path absolute URL path, e.g. "/" or full URL
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
