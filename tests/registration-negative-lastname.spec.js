const { test, expect } = require('@playwright/test');
const { RegistrationModal } = require('../page-objects/RegistrationModal');

test.describe('Registration | Last name field validation', () => {
  let modal;

  test.beforeEach(async ({ page }) => {
    modal = new RegistrationModal(page);
    await page.goto('/');
    await modal.open();
  });

  test('empty Last name shows required error', async () => {
    await modal.lastNameInput.click();
    await modal.emailInput.click();
    await expect(modal.lastNameError).toHaveText(/Last name required/i);
    await expect(modal.lastNameInput).toHaveClass(/ng-invalid/);
  });

  test('Last name with digits shows "Last name is invalid"', async ({ page }) => {
    await modal.lastNameInput.fill('Doe9');
    await page.keyboard.press('Tab');
    await expect(modal.lastNameError).toHaveText(/Last name is invalid/i);
  });

  test('Last name longer than 20 chars shows length error', async ({ page }) => {
    await modal.lastNameInput.fill('B'.repeat(21));
    await page.keyboard.press('Tab');
    await expect(modal.lastNameError).toHaveText(/from 2 to 20 characters long/i);
  });
});
