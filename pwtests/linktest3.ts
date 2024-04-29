import { chromium } from 'playwright';

(async () => {
  // Launch browser
  const browser = await chromium.launch({ headless: false }); 

  // Create a new browser context
  const context = await browser.newContext();

  // Create a new page
  const page = await context.newPage();

  // Navigate to the webpage
  const startTime: number = Date.now();  // Start timer
  await page.goto('http://localhost:3000/rekisteroidy');
  const endTime: number = Date.now();  // End timer
  const loadTime: number = endTime - startTime;

  console.log(`The load time for the register page was ${loadTime} milliseconds.`);
  await page.waitForTimeout(2000); // Wait for 2 seconds
  // Click the button
  await page.click('text=Onko sinulla jo tili? Kirjaudu');
  const startTime2: number = Date.now();  // Start timer
  // Wait for the page to load after button click
  await page.waitForLoadState('networkidle');

  // Get the text content of the h1 element
  const h1Element = await page.$('h1');
  const textContent = h1Element ? await h1Element.textContent() : null;

  // Verify text content
  if (textContent && textContent.includes('Kirjaudu')) {
    console.log('Kirjaudu link Test Passed!');
  } else {
    console.error('Test Failed!');
  }
  const endTime2: number = Date.now();  // End timer
  const loadTime2: number = endTime2 - startTime2;

  console.log(`The load time for the login page is ${loadTime2} milliseconds.`);
  await page.waitForTimeout(2000); // Wait for 2 seconds
  // Close the browser
  await browser.close();
})();