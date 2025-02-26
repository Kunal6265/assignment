import { chromium, test } from '@playwright/test';
import config from '../playwright.config';

const { redditURL } = config.use;

let browser;
let page;

test.beforeAll(async () => {
  browser = await chromium.launch({ headless: false });
  page = await browser.newPage();
});

test.afterAll(async () => { 
  await browser.close();
});

test('reddit post titles', {tag: '@redditNew'}, async () => {
  await page.goto(redditURL);

 const games = '[topic="games"]';
 const actionGames = '[topic="action_games"]';

 await page.waitForSelector(games);
 await page.click(games);

 await page.waitForSelector(actionGames);
 await page.click(actionGames);

 await page.waitForLoadState('networkidle');

  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });
  await page.waitForTimeout(8000);


const posts = [];
for(let i = 39; i <= 44; i++) {
  const postElement = await page.locator(`shreddit-post[feedindex='${i}']`);
  const post = await page.locator(`article [feedindex='${i}'] > [slot=title]`);

  await page.waitForSelector(`article [feedindex='${i}'] > [slot=title]`);

  posts.push({
    feedIndex: await postElement.getAttribute("feedindex") || null, 
    ariaLabel: await post.textContent() || null
  });
}

  posts.forEach((post, index) => {
    console.log(`${index + 40}: Title: ${post.ariaLabel?.toString().trim()}`);
  });
});
