const { test, expect } = require('@playwright/test');

test.describe('CI smoke | qauto reachable in Docker container', () => {
  test('loads the home page and shows the Sign in button', async ({ page }) => {
    await page.goto('/');
    const signIn = page.locator('app-header header.header button.header_signin');
    await expect(signIn).toBeVisible();
    await expect(signIn).toContainText('Sign in');
  });

  test('opens the Sign in modal on header button click', async ({ page }) => {
    await page.goto('/');
    await page.locator('app-header header.header button.header_signin').click();
    const modal = page.locator('app-signin-modal');
    await expect(modal).toBeVisible();
    await expect(modal.getByRole('button', { name: 'Registration' })).toBeVisible();
  });
});
