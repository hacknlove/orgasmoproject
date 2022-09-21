/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import type { PlaywrightTestConfig } from "@playwright/test";
import { devices } from "@playwright/test";

/**
 * See https://playwright.dev/docs/test-configuration.
 */
const config: PlaywrightTestConfig = {
  testDir: "./",
  timeout: 60 * 1000,
  expect: {
    timeout: 5000,
  },
  fullyParallel: true,

  reporter: "list",
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    headless: false,
    actionTimeout: 0,
    baseURL: "http://localhost:3000",
    trace: "on-first-retry",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
      },
    },
  ],

  outputDir: "test-results/",

  webServer: {
    reuseExistingServer: true,
    command: "npm run build && npm start",
    port: 3000,
  },
};

if (process.env.CI) {
  config.use.headless = true;
  config.forbidOnly = true;
  config.retries = 2;
  config.workers = 1;
  config.webServer.timeout = 5 * 60 * 1000;

  config.projects?.push(
    {
      name: "firefox",
      use: {
        ...devices["Desktop Firefox"],
      },
      testIgnore: /vertical/, // in firefox this needs to be tested manually because too much sloopines with the mouse whell and the scroll event
    },
    {
      name: "webkit",
      use: {
        ...devices["Desktop Safari"],
      },
      testIgnore: /vertical/, // in firefox this needs to be tested manually because too much sloopines with the mouse whell and the scroll event
    }
  );
}

if (process.env.PWDEBUG) {
  config.workers = 1;
}

export default config;
