require('dotenv').config();
const path = require('path');
const { defineConfig, devices } = require('@playwright/test');

const {
  BASE_URL,
  BASIC_AUTH_USERNAME,
  BASIC_AUTH_PASSWORD,
} = process.env;

if (!BASE_URL || !BASIC_AUTH_USERNAME || !BASIC_AUTH_PASSWORD) {
  throw new Error(
    'Missing required environment variables: BASE_URL, BASIC_AUTH_USERNAME, BASIC_AUTH_PASSWORD. Check your .env file.'
  );
}

const STORAGE_STATE = path.join(__dirname, 'playwright', '.auth', 'user.json');

module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: 0,
  workers: 1,
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    baseURL: BASE_URL,
    httpCredentials: {
      username: BASIC_AUTH_USERNAME,
      password: BASIC_AUTH_PASSWORD,
    },
    viewport: { width: 1920, height: 1080 },
    actionTimeout: 10000,
    navigationTimeout: 30000,
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
    video: 'off',
    ignoreHTTPSErrors: true,
  },
  projects: [
    {
      name: 'setup',
      testMatch: /.*\.setup\.js/,
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'chromium',
      testMatch: /.*\.spec\.js/,
      dependencies: ['setup'],
      use: {
        ...devices['Desktop Chrome'],
        storageState: STORAGE_STATE,
      },
    },
  ],
});
