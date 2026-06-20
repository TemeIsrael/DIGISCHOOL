// playwright.config.ts
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  skipInstall: true,
  testDir: './tests',
  timeout: 30_000,
  expect: {
    timeout: 5000,
  },
  use: {
    baseURL: 'http://localhost:5174',
    // No trace or video to avoid ffmpeg requirement

  },
  projects: [
    {
      name: 'chrome',
      use: {
        browserName: 'chromium',
        executablePath: '/usr/bin/google-chrome',
        headless: false,
      },
    },
    {
      name: 'firefox',
      use: {
        browserName: 'firefox',
        executablePath: '/usr/bin/firefox',
        headless: false,
      },
    },
  ],
});
