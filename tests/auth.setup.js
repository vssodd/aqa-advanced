const { test: setup, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const { RegistrationModal } = require('../page-objects/RegistrationModal');
const { validUser } = require('../helpers/userFactory');

const authDir = path.join(__dirname, '..', 'playwright', '.auth');
const authFile = path.join(authDir, 'user.json');
const userFile = path.join(authDir, 'user-credentials.json');

setup('register user and store authenticated state', async ({ page }) => {
  const user = validUser();
  const modal = new RegistrationModal(page);

  await page.goto('/');
  await modal.open();
  await modal.fillAndSubmit(user);

  await expect(page).toHaveURL(/\/panel\/garage/, { timeout: 20000 });

  fs.mkdirSync(authDir, { recursive: true });
  await page.context().storageState({ path: authFile });
  fs.writeFileSync(userFile, JSON.stringify(user, null, 2));
});
