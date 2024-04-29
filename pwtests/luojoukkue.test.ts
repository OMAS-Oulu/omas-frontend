import { chromium } from 'playwright';

async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

(async () => {
  const browser = await chromium.launch({ headless: false });  // Use chrome to launch the browser

  // Create a new browser context
  const context = await browser.newContext();

  // Create a new page
  const page = await context.newPage();

  // Navigate to the login page
  await page.goto('http://localhost:3000/kirjaudu');

  // Fill out the username and password fields
  await page.fill('input[name="username"]', 'ginyu95');
  await page.fill('input[name="password"]', 'jokin123');

  // Click the login button (replace 'button[type="submit"]' with the appropriate selector for your login button)
  await page.click('button[type="submit"]');
  
    // Assuming CAPTCHA loads and you need time to solve it
    console.log('Please solve the CAPTCHA now...');
    await page.waitForTimeout(30000); // Wait for 30 seconds
  // Assert whether the browser is on the correct webpage
  const currentURL = page.url();
  const expectedURL = 'http://localhost:3000/'; // the expected URL
  if (currentURL === expectedURL) {
    console.log('Login Passed: Browser is on the main webpage.');
  } else {
    console.error('Test Failed: Browser is not on the correct webpage.');
  }

  await page.click('text=Seurat');
  await page.click('button:has-text("Liity seuraan")');
  await page.waitForTimeout(1000); // Wait for 1 second
  await page.screenshot({ path: 'example.png' });
  console.log('Club has been has been joined!');
  await page.waitForTimeout(5000); // Wait for 5 seconds
  await page.click('text=Kilpailut');
  await page.waitForTimeout(1000); // Wait for 1 second
  await page.click('p:text("Talvi Pistooli")');
  await page.waitForTimeout(1000); // Wait for 1 second
  await page.fill('input[placeholder="Joukkueen nimi"]', 'My New Team');
  await page.waitForTimeout(1000); // Wait for 1 second
  await page.click('text=Luo joukkue');
  await page.waitForTimeout(5000); // Wait for 5 seconds
  console.log('New team has been created!');
  await page.waitForTimeout(10000); // Wait for 10 seconds

  await page.click('text=ginyu95');
  await page.waitForTimeout(2000); // Wait for 2 seconds
  await page.click('text=Kirjaudu ulos');
  console.log('Logout successful');
  await page.waitForTimeout(2000); // Wait for 2 seconds

//  console.log(await page.title());

  // Close the browser
  await browser.close();
})();