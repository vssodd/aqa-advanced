const base = require('@playwright/test');
const { GaragePage } = require('../page-objects/GaragePage');

const test = base.test.extend({
  userGaragePage: async ({ page }, use) => {
    const garage = new GaragePage(page);
    await garage.open();
    await use(garage);
  },
});

const expect = base.expect;

module.exports = { test, expect };
