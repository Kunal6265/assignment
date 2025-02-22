import { chromium, test, expect } from '@playwright/test';
import config from '../playwright.config';

const { yahooCredentials, yahooMailURL } = config.use;

let browser;
let context;
let page;
let newTab;

test.beforeAll(async () => {
  browser = await chromium.launch({ headless: false });
  context = await browser.newContext();
  page = await context.newPage();
});

test.afterAll(async () => {
  await browser.close();
});

test('Reply to the email with an acceptance message', {tag: '@yahoo'}, async () => {
  await page.goto(yahooMailURL);

  await page.fill('input[name="username"]', yahooCredentials.username);  
  await page.click('[type="submit"]');

  await page.fill('input[name="password"]', yahooCredentials.password);
  await page.click('[type="submit"]');

  await page.click('[id="ybarMailLink"]');
  newTab = await context.waitForEvent('page');

  await expect(newTab.locator('[aria-label="Compose"]')).toContainText("Compose");

  await newTab.click('input[aria-label="Search box. Find messages, documents, photos or people"]')
  await newTab.fill('input[aria-label="Search box. Find messages, documents, photos or people"]', 'subject:Next Round');
  await newTab.keyboard.press('Enter');

  await newTab.click('[data-test-id="senders-span"]');

  await newTab.click('[data-test-id="reply"]');

  const replyMessage = "I accept the invitation to proceed to the next round.";
  await newTab.fill('[aria-label="Message body"]', replyMessage);

  await newTab.click('[data-test-id="compose-send-button"]');
  
  await expect(newTab.locator('[data-test-id="notifications"]')).toContainText("Your message has been sent.");

  await expect(newTab.locator('[data-test-id="compose-send-button"]')).toBeDisabled();
});
