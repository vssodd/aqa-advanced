require('dotenv').config();
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

module.exports = defineConfig({
  testDir: './tests',
  testMatch: '**/registration-*.spec.js',
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
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
});
