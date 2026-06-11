const { test, expect } = require('@playwright/test');
const { RegistrationModal } = require('../page-objects/RegistrationModal');
const { validUser } = require('../helpers/userFactory');

test.describe('Registration | Re-enter password validation and submit gating', () => {
  let modal;

  test.beforeEach(async ({ page }) => {
    modal = new RegistrationModal(page);
    await page.goto('/');
    await modal.open();
  });

  test('empty Re-enter password shows required error', async ({ page }) => {
    await modal.passwordInput.fill('Welcome1');
    await modal.repeatPasswordInput.click();
    await page.keyboard.press('Tab');
    await expect(modal.repeatPasswordError).toHaveText(/Re-enter password required/i);
    await expect(modal.repeatPasswordInput).toHaveClass(/ng-invalid/);
  });

  test('mismatched Re-enter password shows "Passwords do not match"', async ({ page }) => {
    await modal.passwordInput.fill('Welcome1');
    await modal.repeatPasswordInput.fill('Welcome2');
    await page.keyboard.press('Tab');
    await expect(modal.repeatPasswordError).toHaveText(/Passwords do not match/i);
  });

  test('Register button is disabled when form is empty', async () => {
    await expect(modal.registerBtn).toBeDisabled();
  });

  test('Register button is disabled when one field is invalid', async ({ page }) => {
    const user = validUser();
    await modal.fill({
      name: user.name,
      lastName: user.lastName,
      email: 'aqa-broken-email',
      password: user.password,
      repeatPassword: user.password,
    });
    await page.keyboard.press('Tab');
    await expect(modal.registerBtn).toBeDisabled();
  });
});
