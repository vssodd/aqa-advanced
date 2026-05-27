const { defineConfig } = require('cypress');

module.exports = defineConfig({
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports',
    overwrite: false,
    html: false,
    json: true,
    timestamp: 'yyyy-mm-dd_HH-MM-ss',
  },
  e2e: {
    baseUrl: 'https://qauto.forstudy.space',
    specPattern: 'cypress/e2e/**/*.cy.js',
    supportFile: 'cypress/support/e2e.js',
    viewportWidth: 1920,
    viewportHeight: 1080,
    video: false,
    screenshotOnRunFailure: true,
    defaultCommandTimeout: 8000,
    pageLoadTimeout: 30000,
    chromeWebSecurity: false,
  },
  env: {
    basicAuthUsername: 'guest',
    basicAuthPassword: 'welcome2qauto',
    userPrefix: 'qauto',
    userPassword: 'Welcome123',
  },
});
