const { test, expect } = require('@playwright/test');

test('Has all the elements', async ({ page }) => {
    await page.goto('http://localhost:3000/basiclayout');

    await page.waitForSelector('text=Basic Layout test')
    expect(page).toHaveTitle('Basic Layout test')
    expect(await page.locator('text=hello').count()).toEqual(1)
    await page.waitForSelector('text=Footer')
})