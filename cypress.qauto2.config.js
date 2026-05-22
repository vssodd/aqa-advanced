const { defineConfig } = require('cypress');
const main = require('./cypress.config.js');

module.exports = defineConfig({
  ...main,
  e2e: {
    ...main.e2e,
    baseUrl: 'https://qauto2.forstudy.space',
  },
  env: {
    basicAuthUsername: 'guest',
    basicAuthPassword: 'welcome2qauto',
    userPrefix: 'qauto2',
    userPassword: 'Welcome123',
  },
});
