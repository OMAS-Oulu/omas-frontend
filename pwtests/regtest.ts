import { chromium } from 'playwright';

(async () => {
  // Launch browser
  const browser = await chromium.launch({ headless: false }); 

  // Create a new browser context
  const context = await browser.newContext();

  // Create a new page
  const page = await context.newPage();

  // Navigate to the login page
  await page.goto('http://localhost:3000/rekisteroidy');

  // Fill out the username and password fields
  const startTime: number = Date.now();  // Start timer
  await page.fill('input[name="email"]', 'example@gmail.com');
  await page.fill('input[name="name"]', 'Artsi');
  await page.fill('input[name="username"]', 'ginyu');
  await page.fill('input[name="password"]', 'joku123');
  await page.fill('input[name="passrepeat"]', 'joku123');

  // Click the login button (replace 'button[type="submit"]' with the appropriate selector for your login button)
  await page.click('button:has-text("Rekisteröidy")');
  const endTime: number = Date.now();  // End timer
  const loadTime: number = endTime - startTime;

  console.log(`The time for the input in register fields was ${loadTime} milliseconds.`);
      // Assuming CAPTCHA loads and you need time to solve it
      console.log('Please solve the CAPTCHA now...');
      await page.waitForTimeout(30000); // Wait for 30 seconds

  await page.waitForLoadState();
  // Assert whether the browser is on the correct webpage
  const currentURL = page.url();
  const expectedURL = 'http://localhost:3000/'; // Replace with the expected URL
  if (currentURL === expectedURL) {
    console.log('Test Passed: Browser is on the correct webpage.');
  } else {
    console.error('Test Failed: Browser is not on the correct webpage.');
  }
  await page.waitForTimeout(2000); // Wait for 2 seconds
  await page.click('text=ginyu');
  await page.waitForTimeout(2000); // Wait for 2 seconds
  await page.click('text=Kirjaudu ulos');
  console.log('Logout successful');
  await page.waitForTimeout(2000); // Wait for 2 seconds
  console.log(await page.title());

  // Close the browser
  await browser.close();
})();