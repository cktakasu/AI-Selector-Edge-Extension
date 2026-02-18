import { chromium } from 'playwright';
import path from 'node:path';

const repo = '/Users/mogura/Documents/Development/AI-Selector-Edge-Extension';
const popupUrl = 'http://127.0.0.1:4173/index.html';
const popupShot = path.join(repo, 'artifacts', 'popup.png');
const targetShot = path.join(repo, 'artifacts', 'opened-chatgpt.png');

const browser = await chromium.launch({ headless: true });
const context = await browser.newContext();
const page = await context.newPage();

await page.addInitScript(() => {
  const opened = [];
  // @ts-ignore
  window.__openedUrls = opened;
  const originalOpen = window.open.bind(window);
  window.open = (url, target, features) => {
    opened.push({ url: String(url), target: String(target ?? '') });
    try {
      return originalOpen(url, target, features);
    } catch {
      return null;
    }
  };
});

await page.goto(popupUrl, { waitUntil: 'networkidle' });
await page.setViewportSize({ width: 520, height: 180 });
await page.waitForTimeout(700);
await page.screenshot({ path: popupShot, fullPage: true });

await page.getByRole('button', { name: 'Open ChatGPT' }).click();
await page.waitForTimeout(500);
const opened = await page.evaluate(() => {
  // @ts-ignore
  return window.__openedUrls?.[0] ?? null;
});

if (!opened?.url) {
  throw new Error('window.open URL を取得できませんでした');
}

const target = await context.newPage();
await target.goto(opened.url, { waitUntil: 'domcontentloaded', timeout: 45000 });
await target.waitForTimeout(2000);
await target.screenshot({ path: targetShot, fullPage: true });

console.log('POPUP_SHOT=' + popupShot);
console.log('OPENED_URL=' + opened.url);
console.log('OPENED_TARGET=' + opened.target);
console.log('TARGET_SHOT=' + targetShot);

await browser.close();
