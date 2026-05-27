// @ts-check
import { defineConfig, devices } from '@playwright/test';

const DEFAULT_ENV = 'dev';

/** @type {readonly ['dev', 'staging', 'prod']} */
const ENV_NAMES = ['dev', 'staging', 'prod'];

/** @typedef {typeof ENV_NAMES[number]} EnvironmentName */

/** @type {Record<EnvironmentName, string | undefined>} */
const ENVIRONMENTS = {
  dev: process.env.DEV_BASE_URL,
  staging: process.env.STAGING_BASE_URL,
  prod: process.env.PROD_BASE_URL,
};

/**
 * @param {string | undefined} value
 * @returns {EnvironmentName}
 */
function resolveEnvironment(value) {
  if (ENV_NAMES.includes(/** @type {EnvironmentName} */ (value))) {
    return /** @type {EnvironmentName} */ (value);
  }

  return DEFAULT_ENV;
}

const TEST_ENV = resolveEnvironment(process.env.TEST_ENV);
const BASE_URL = ENVIRONMENTS[TEST_ENV];

if (!BASE_URL) {
  throw new Error(`Missing base URL for TEST_ENV="${TEST_ENV}".`);
}

const GEO_LATITUDE = Number(process.env.GEO_LATITUDE);
const GEO_LONGITUDE = Number(process.env.GEO_LONGITUDE);

const hasGeolocation = Number.isFinite(GEO_LATITUDE) && Number.isFinite(GEO_LONGITUDE);

export default defineConfig({
  testDir: './tests',

  fullyParallel: true,
  forbidOnly: !!process.env.CI,

  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 1 : undefined,

  timeout: 120_000,

  expect: {
    timeout: 10_000,
  },

  reporter: process.env.CI
    ? [['html', { open: 'never' }], ['github']]
    : [['html', { open: 'on-failure' }], ['list']],

  use: {
    baseURL: BASE_URL,

    actionTimeout: 10_000,
    navigationTimeout: 60_000,

    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',

    ...(hasGeolocation && {
      geolocation: {
        latitude: GEO_LATITUDE,
        longitude: GEO_LONGITUDE,
      },
      permissions: ['geolocation'],
    }),
  },

  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
  ],
});

/*
Пример .env:

TEST_ENV=dev

DEV_BASE_URL=https://dev.example.com
STAGING_BASE_URL=https://staging.example.com
PROD_BASE_URL=https://example.com

GEO_LATITUDE=00.0000
GEO_LONGITUDE=00.0000

Команды:

TEST_ENV=dev npx playwright test
TEST_ENV=staging npx playwright test
TEST_ENV=prod npx playwright test
*/
