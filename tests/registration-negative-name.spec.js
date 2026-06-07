const { test, expect } = require('@playwright/test');
const { RegistrationModal } = require('../page-objects/RegistrationModal');
const { validUser } = require('../helpers/userFactory');

test.describe('Registration | Name field validation', () => {
  let modal;

  test.beforeEach(async ({ page }) => {
    modal = new RegistrationModal(page);
    await page.goto('/');
    await modal.open();
  });

  test('empty Name shows required error and marks field invalid', async () => {
    await modal.nameInput.click();
    await modal.lastNameInput.click();
    await expect(modal.nameError).toHaveText(/Name required/i);
    await expect(modal.nameInput).toHaveClass(/ng-invalid/);
  });

  test('Name with digits shows "Name is invalid"', async ({ page }) => {
    await modal.nameInput.fill('John123');
    await page.keyboard.press('Tab');
    await expect(modal.nameError).toHaveText(/Name is invalid/i);
  });

  test('Name shorter than 2 chars shows length error', async ({ page }) => {
    await modal.nameInput.fill('J');
    await page.keyboard.press('Tab');
    await expect(modal.nameError).toHaveText(/from 2 to 20 characters long/i);
  });

  test('Name longer than 20 chars shows length error', async ({ page }) => {
    await modal.nameInput.fill('A'.repeat(21));
    await page.keyboard.press('Tab');
    await expect(modal.nameError).toHaveText(/from 2 to 20 characters long/i);
  });
});
