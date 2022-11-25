const { test, expect } = require("@playwright/test");

test("Scrolls", async ({ page }) => {
  await page.goto("http://localhost:3000/horizontal");

  await page.waitForSelector("text=Horizontal Scroll test");

  await page.waitForSelector("text=Horizontal Scroll");

  expect(await page.locator("text=[0rowte]").count()).toEqual(1);
  expect(await page.locator("text=[8rowte]").count()).toEqual(1);

  for (let i = 0; i < 8; i++) {
    await page.locator(".Slider").hover();
    await page.locator('[aria-label="next"]').click();
  }

  for (let i = 0; i < 4; i++) {
    await page.locator(".Slider").hover();
    await page.locator('[aria-label="prev"]').click();
  }
});
