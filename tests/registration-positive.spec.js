const { test, expect } = require('@playwright/test');
const { RegistrationModal } = require('../page-objects/RegistrationModal');
const { validUser } = require('../helpers/userFactory');

test.describe('Registration | positive', () => {
  test('registers a new user with valid data and redirects to /panel/garage', async ({ page }) => {
    const user = validUser();
    const modal = new RegistrationModal(page);

    await page.goto('/');
    await modal.open();
    await modal.fillAndSubmit(user);

    await expect(page).toHaveURL(/\/panel\/garage/, { timeout: 20000 });
  });
});
