const { test, expect } = require('@playwright/test');

test('Scrolls', async ({ page }) => {
    await page.goto('http://localhost:3000/');

    await page.waitForSelector('text=Welcome to Next.js!')
    await page.waitForSelector('text=Re-Powered by Orgasmo')
    await page.mouse.wheel(0, 238)
    await page.waitForSelector('text=Enhanced with orgasmo')
})