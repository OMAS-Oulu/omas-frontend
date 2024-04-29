import { chromium } from 'playwright';

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  const startTime: number = Date.now();  // Start timer
  await page.goto('https://omas-frontend.vercel.app/');
  console.log(await page.title());
  const endTime: number = Date.now();  // End timer
  const loadTime: number = endTime - startTime;

  console.log(`The load time for the main page is ${loadTime} milliseconds.`);
  await browser.close();
})();
