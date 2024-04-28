import { chromium } from 'playwright';

(async () => {
  // Launch browser
  const browser = await chromium.launch({ headless: false }); 

  // Create a new browser context
  const context = await browser.newContext();

  // Create a new page
  const page = await context.newPage();
  const startTime: number = Date.now();  // Start timer
  // Navigate to the webpage containing the link
  await page.goto('https://omas-frontend.vercel.app/');
  const endTime: number = Date.now();  // End timer
  const loadTime: number = endTime - startTime;

  console.log(`The load time for the main page was ${loadTime} milliseconds.`);

  // Click the link (replace 'a' with the appropriate selector for your link)
  await page.click('text=Näytä kaikki kilpailut');
  const startTime2: number = Date.now();  // Start timer
  // Wait for the page to load after link click (replace 'networkidle' with appropriate load state)
  await page.waitForLoadState('networkidle');
    const h1Element = await page.$('h1');
  const textContent = h1Element ? await h1Element.textContent() : null;

  // Perform further actions or assertions as needed
    // Verify text content
    if (textContent && textContent.includes('Aktiiviset ja tulevat kilpailut')) {
      console.log('Näytä kaikki kilpailut Test Passed!');
    } else {
      console.error('Test Failed!');
    }
    const endTime2: number = Date.now();  // End timer
    const loadTime2: number = endTime2 - startTime2;
  
    console.log(`The load time for the competitions page is ${loadTime2} milliseconds.`);
    await page.waitForTimeout(2000); // Wait for 2 seconds

  // Close the browser
  await browser.close();
})();