const { test, expect } = require('@playwright/test');

test('Has all the elements', async ({ page }) => {
    await page.goto('http://localhost:3000/item/hellowword/5');

    await page.waitForSelector('text=hellowword - 5')
})