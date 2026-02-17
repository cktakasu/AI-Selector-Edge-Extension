import { chromium } from 'playwright';
import path from 'node:path';

const repo = '/Users/mogura/Documents/Development/AI-Selector-Edge-Extension';
const popupUrl = 'file://' + path.join(repo, 'dist', 'index.html');

const browser = await chromium.launch({ headless: false });
const context = await browser.newContext();
const page = await context.newPage();
await page.goto(popupUrl);
await page.getByRole('button', { name: 'Open ChatGPT' }).click();
await page.waitForTimeout(3000);
console.log('done');
await browser.close();
