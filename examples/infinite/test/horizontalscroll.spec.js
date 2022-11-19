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

  expect(await page.locator(".Item").count()).toEqual(12);
  expect(await page.locator("text=[35rowt]").count()).toEqual(1);
  expect(await page.locator("text=[44rowt]").count()).toEqual(1);

  for (let i = 0; i < 4; i++) {
    await page.locator(".Slider").hover();
    await page.locator('[aria-label="prev"]').click();
  }
  expect(await page.locator(".Item").count()).toEqual(16);
  expect(await page.locator("text=[15rowt]").count()).toEqual(1);
  expect(await page.locator("text=[29rowt]").count()).toEqual(1);
});
