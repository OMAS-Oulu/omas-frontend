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
const test_1 = require("@playwright/test");
describe('Example Test Suite', () => {
    (0, test_1.test)('should do something', (_a) => __awaiter(void 0, [_a], void 0, function* ({ page }) {
        const browser = yield playwright_1.chromium.launch();
        yield page.goto('https://omas-frontend.vercel.app/');
        console.log(yield page.title());
        yield browser.close();
    }));
});
