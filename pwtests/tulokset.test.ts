import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch({ headless: false });
  // Launch browser

  // Create a new browser context
  const context = await browser.newContext();

  // Create a new page
  const page = await context.newPage();

  // Navigate to the webpage
  const startTime: number = Date.now();  // Start timer
  await page.goto('http://localhost:3000/tulokset');
  const endTime: number = Date.now();  // End timer
  const loadTime: number = endTime - startTime;

  console.log(`The load time for the scores page was ${loadTime} milliseconds.`);
  await page.waitForTimeout(2000); // Wait for 2 seconds
  // Click the header element with specific name (replace 'Header Name' with the actual name)
  const startTime2: number = Date.now();  // Start timer
  await page.click('text=Polaris-ampumaharjoitus');

  // Wait for the page to load after header click (replace 'networkidle' with appropriate load state)
  await page.waitForLoadState('networkidle');
  console.log('View scores success!');
  const endTime2: number = Date.now();  // End timer
  const loadTime2: number = endTime2 - startTime2;

  console.log(`The load time for the team Polaris-ampumaharjoitus scores is ${loadTime2} milliseconds.`);
  await page.waitForTimeout(2000); // Wait for 2 seconds
  await page.screenshot({ path: 'tulokset.png' });
  // Close the browser
  await browser.close();
})();