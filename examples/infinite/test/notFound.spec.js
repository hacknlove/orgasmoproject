const { test } = require("@playwright/test");

test("Returns 404 if the page is not found", async ({ page }) => {
  await page.goto("http://localhost:3000/this-path-does-not-exists");

  await page.waitForSelector("text=404");
  await page.waitForSelector("text=This page could not be found.");
});
