const { test, expect } = require('../fixtures/userGaragePage');

test.describe('Garage | userGaragePage fixture', () => {
  test('lands on /panel/garage already authenticated via storageState', async ({ userGaragePage }) => {
    await expect(userGaragePage.page).toHaveURL(/\/panel\/garage/);
    await expect(userGaragePage.heading).toBeVisible();
    await expect(userGaragePage.addCarButton).toBeVisible();
  });

  test('garage has no cars for a freshly registered user', async ({ userGaragePage }) => {
    await expect(userGaragePage.carItems).toHaveCount(0);
  });

  test('sign-in button is not rendered for an authenticated user', async ({ userGaragePage }) => {
    await expect(userGaragePage.signInButton).toHaveCount(0);
  });
});
