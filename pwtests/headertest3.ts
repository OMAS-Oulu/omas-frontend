import { chromium } from 'playwright';

(async () => {
  // Launch browser
  const browser = await chromium.launch({ headless: false }); 

  // Create a new browser context
  const context = await browser.newContext();

  // Create a new page
  const page = await context.newPage();
  const startTime: number = Date.now();  // Start timer

  // Navigate to the webpage
  await page.goto('http://localhost:3000/');
  const endTime: number = Date.now();  // End timer
  const loadTime: number = endTime - startTime;

  console.log(`The load time for the main page was ${loadTime} milliseconds.`);

  // Click the header element with specific name (replace 'Header Name' with the actual name)
  await page.waitForTimeout(2000); // Wait for 2 seconds
  const startTime2: number = Date.now();  // Start timer
  await page.click('text=Pisteiden ilmoitus');

  // Wait for the page to load after header click (replace 'networkidle' with appropriate load state)
  await page.waitForLoadState('networkidle');
  const h1Element = await page.$('h2');
  const textContent = h1Element ? await h1Element.textContent() : null;

  // Perform further actions or assertions as needed
    // Verify text content
    if (textContent && textContent.includes('Kirjaudu sisään syöttääksesi tuloksia')) {
      console.log('Pass! Et voi ilmoittaa tuloksia kirjautumatta.');
    } else {
      console.error('Test Failed! Ilmoittautumiseen paastiin kasiksi kirjautumatta.');
    }
    const endTime2: number = Date.now();  // End timer
    const loadTime2: number = endTime2 - startTime2;
  
    console.log(`The load time for the scores page is ${loadTime2} milliseconds.`);
    await page.waitForTimeout(2000); // Wait for 2 seconds

  // Close the browser
  await browser.close();
})();