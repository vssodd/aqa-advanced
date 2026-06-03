const { test, expect } = require('@playwright/test');
const { RegistrationModal } = require('../page-objects/RegistrationModal');

test.describe('Registration | Email field validation', () => {
  let modal;

  test.beforeEach(async ({ page }) => {
    modal = new RegistrationModal(page);
    await page.goto('/');
    await modal.open();
  });

  test('empty Email shows required error', async () => {
    await modal.emailInput.click();
    await modal.passwordInput.click();
    await expect(modal.emailError).toHaveText(/Email required/i);
    await expect(modal.emailInput).toHaveClass(/ng-invalid/);
  });

  test('invalid Email format shows "Email is incorrect"', async ({ page }) => {
    await modal.emailInput.fill('aqa-broken-email');
    await page.keyboard.press('Tab');
    await expect(modal.emailError).toHaveText(/Email is incorrect/i);
  });
});
