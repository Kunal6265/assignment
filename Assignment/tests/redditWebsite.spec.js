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

test('reddit post titles', {tag: '@reddit'}, async () => {
  await page.goto(redditURL);

  const titleSelector = 'shreddit-feed a:nth-of-type(2)';
  await page.waitForSelector(titleSelector);

  await page.evaluate(() => {
    window.scrollTo(0, document.body.scrollHeight);
  });
  await page.waitForTimeout(8000);

  const posts = await page.evaluate(() => {
    const posts = [];
    for(let i = 39; i <= 44; i++) {
      const postElement = document.querySelector(`shreddit-post[feedindex='${i}']`);
      const post = document.querySelector(`article [feedindex='${i}'] > [slot=title]`);

      posts.push({
        feedIndex: postElement?.getAttribute("feedindex") || null,
        ariaLabel: post?.textContent || null
      });
    }
    return posts;
  });

  posts.forEach((post, index) => {
    console.log(`${index + 40}: Title: ${post.ariaLabel?.toString() || "No title found."}`);
  });
});
