import { chromium } from 'playwright';
import { test, expect } from '@playwright/test';

describe('Example Test Suite', () => { // Use describe directly from your test runner
  test('should do something', async ({ page }) => {
  const browser = await chromium.launch();
  await page.goto('https://omas-frontend.vercel.app/');
  console.log(await page.title());
  await browser.close();
});
});
