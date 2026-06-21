const { test, expect } = require('@playwright/test');
const { ProfilePage } = require('../page-objects/ProfilePage');

test.describe('Profile | mocked GET /api/users/profile', () => {
  test('UI displays the name returned by the intercepted response', async ({ page }) => {
    const mocked = {
      status: 'ok',
      data: {
        userId: 999999,
        photoFilename: null,
        name: 'Mocked',
        lastName: 'Person',
      },
    };

    await page.route('**/api/users/profile', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mocked),
      });
    });

    const profile = new ProfilePage(page);
    await profile.open();

    await expect(profile.heading).toBeVisible();
    await expect(profile.displayedName).toHaveText(`${mocked.data.name} ${mocked.data.lastName}`);
  });

  test('UI reflects updated mock when route is changed', async ({ page }) => {
    const mocked = {
      status: 'ok',
      data: {
        userId: 888888,
        photoFilename: null,
        name: 'Override',
        lastName: 'Identity',
      },
    };

    await page.route('**/api/users/profile', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mocked),
      });
    });

    const profile = new ProfilePage(page);
    await profile.open();

    await expect(profile.displayedName).toContainText('Override');
    await expect(profile.displayedName).toContainText('Identity');
  });
});
