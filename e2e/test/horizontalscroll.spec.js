const { test, expect } = require('@playwright/test');

async function log(click, page) {
    console.log('#'.repeat(5), click, '#'.repeat(5));
    const items = (await page.$$('.Item'))
    console.log((await items[0].innerText()).replace(/\s/g, ''));
    console.log((await items[items.length -1].innerText()).replace(/\s/g, ''));
    console.log(items.length);
}

test('Has all the elements', async ({ page }) => {
    await page.goto('http://localhost:3000/horizontalscroll');

    await page.waitForSelector('text=Horizontal Scroll test');

    await page.waitForSelector('text=Horizontal Scroll');

    expect(await page.locator('text=0rowte').count()).toEqual(1);
    expect(await page.locator('text=8rowte').count()).toEqual(1);

    for (let i = 0; i < 12; i++) {
        await page.locator('.Slider').hover();
        await page.locator('[aria-label="next"]').click();
    }


    expect(await page.locator('.Item').count()).toEqual(11);

    expect(await page.locator('text=54rowt').count()).toEqual(1);
    expect(await page.locator('text=64rowt').count()).toEqual(1);

    for (let i = 0; i < 12; i++) {
        await page.locator('.Slider').hover();
        await page.locator('[aria-label="prev"]').click();
    }

    expect(await page.locator('.Item').count()).toEqual(11);
    expect(await page.locator('text=0rowte').count()).toEqual(1);
    expect(await page.locator('text=10rowt').count()).toEqual(1);
})