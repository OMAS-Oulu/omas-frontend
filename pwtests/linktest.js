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
(() => __awaiter(void 0, void 0, void 0, function* () {
    // Launch browser
    const browser = yield playwright_1.chromium.launch({ headless: false });
    // Create a new browser context
    const context = yield browser.newContext();
    // Create a new page
    const page = yield context.newPage();
    const startTime = Date.now(); // Start timer
    // Navigate to the webpage containing the link
    yield page.goto('https://omas-frontend.vercel.app/');
    const endTime = Date.now(); // End timer
    const loadTime = endTime - startTime;
    console.log(`The load time for the main page was ${loadTime} milliseconds.`);
    // Click the link (replace 'a' with the appropriate selector for your link)
    yield page.click('text=Näytä kaikki kilpailut');
    const startTime2 = Date.now(); // Start timer
    // Wait for the page to load after link click (replace 'networkidle' with appropriate load state)
    yield page.waitForLoadState('networkidle');
    const h1Element = yield page.$('h1');
    const textContent = h1Element ? yield h1Element.textContent() : null;
    // Perform further actions or assertions as needed
    // Verify text content
    if (textContent && textContent.includes('Aktiiviset ja tulevat kilpailut')) {
        console.log('Näytä kaikki kilpailut Test Passed!');
    }
    else {
        console.error('Test Failed!');
    }
    const endTime2 = Date.now(); // End timer
    const loadTime2 = endTime2 - startTime2;
    console.log(`The load time for the competitions page is ${loadTime2} milliseconds.`);
    yield page.waitForTimeout(2000); // Wait for 2 seconds
    // Close the browser
    yield browser.close();
}))();
