const { test, expect } = require('@playwright/test');
const { RegistrationModal } = require('../page-objects/RegistrationModal');

test.describe('Registration | Password field validation', () => {
  let modal;
  const expected = /from 8 to 15 characters long and contain at least one integer, one capital, and one small letter/i;

  test.beforeEach(async ({ page }) => {
    modal = new RegistrationModal(page);
    await page.goto('/');
    await modal.open();
  });

  test('empty Password shows required error', async () => {
    await modal.passwordInput.click();
    await modal.repeatPasswordInput.click();
    await expect(modal.passwordError).toHaveText(/Password required/i);
    await expect(modal.passwordInput).toHaveClass(/ng-invalid/);
  });

  test('Password shorter than 8 chars shows format error', async ({ page }) => {
    await modal.passwordInput.fill('Aa1bcd');
    await page.keyboard.press('Tab');
    await expect(modal.passwordError).toHaveText(expected);
  });

  test('Password longer than 15 chars shows format error', async ({ page }) => {
    await modal.passwordInput.fill('Welcome1Welcome1A');
    await page.keyboard.press('Tab');
    await expect(modal.passwordError).toHaveText(expected);
  });

  test('Password without uppercase shows format error', async ({ page }) => {
    await modal.passwordInput.fill('welcome1');
    await page.keyboard.press('Tab');
    await expect(modal.passwordError).toHaveText(expected);
  });

  test('Password without lowercase shows format error', async ({ page }) => {
    await modal.passwordInput.fill('WELCOME1');
    await page.keyboard.press('Tab');
    await expect(modal.passwordError).toHaveText(expected);
  });

  test('Password without digit shows format error', async ({ page }) => {
    await modal.passwordInput.fill('Welcomeqa');
    await page.keyboard.press('Tab');
    await expect(modal.passwordError).toHaveText(expected);
  });
});
