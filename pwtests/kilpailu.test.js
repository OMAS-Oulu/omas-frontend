"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const playwright_1 = require("playwright");
function delay(ms) {
    return __awaiter(this, void 0, void 0, function* () {
        return new Promise(resolve => setTimeout(resolve, ms));
    });
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    const browser = yield playwright_1.chromium.launch({ headless: false }); // Use chrome to launch the browser
    // Create a new browser context
    const context = yield browser.newContext();
    // Create a new page
    const page = yield context.newPage();
    // Navigate to the login page
    yield page.goto('https://omas-frontend.vercel.app/kirjaudu');
    // Fill out the username and password fields
    yield page.fill('input[name="username"]', 'ginyu95');
    yield page.fill('input[name="password"]', 'jokin123');
    // Click the login button (replace 'button[type="submit"]' with the appropriate selector for your login button)
    yield page.click('button[type="submit"]');
    // Assuming CAPTCHA loads and you need time to solve it
    console.log('Please solve the CAPTCHA now...');
    yield page.waitForTimeout(30000); // Wait for 30 seconds
    // Assert whether the browser is on the correct webpage
    const currentURL = page.url();
    const expectedURL = 'https://omas-frontend.vercel.app/'; // the expected URL
    if (currentURL === expectedURL) {
        console.log('Login Passed: Browser is on the main webpage.');
    }
    else {
        console.error('Test Failed: Browser is not on the correct webpage.');
    }
    yield page.click('text=Seurat');
    yield page.click('button:has-text("Liity seuraan")');
    yield page.waitForTimeout(1000); // Wait for 1 second
    yield page.screenshot({ path: 'example.png' });
    console.log('Club has been has been joined!');
    yield page.waitForTimeout(5000); // Wait for 5 seconds
    yield page.click('text=Kilpailut');
    const startTime = Date.now(); // Start timer
    yield page.click('p:text("Talvi Pistooli")');
    yield page.click('button:has-text("Liity joukkueeseen")');
    console.log('Competition and team have been has been joined!');
    const endTime = Date.now(); // End timer
    const loadTime = endTime - startTime;
    console.log(`The time for joining the competition and team was ${loadTime} milliseconds.`);
    yield page.waitForTimeout(10000); // Wait for 10 seconds
    yield page.click('text=ginyu95');
    yield page.waitForTimeout(2000); // Wait for 2 seconds
    yield page.click('text=Kirjaudu ulos');
    console.log('Logout successful');
    yield page.waitForTimeout(2000); // Wait for 2 seconds
    //  console.log(await page.title());
    // Close the browser
    yield browser.close();
}))();
