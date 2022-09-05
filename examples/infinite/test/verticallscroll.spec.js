const { test, expect } = require('@playwright/test');

function nToString (number) {
    return `text=[${(Math.sin(number+0.1).toString(32).replace(/^-?0?.?/, '')+Math.sin(number+1).toString(32).replace(/^-?0?.?/, '')).substring(0,6)}]`
}

function wait (n = 0) {
    return new Promise(resolve => setTimeout(resolve, n))
}

test.beforeEach(({page}) => {
    page.waitForNotSelector = async(selector, timeout = 5000) => {
        const start = Date.now()
        while(await page.locator(selector).count()) {
            await wait()
            if (Date.now() - start > timeout) {
                throw new Error(`Selector ${selector} is still there`)
            }
        }
    };
})


// Run tests in this file with portrait-like viewport.
test.use({ viewport: { width: 600, height: 952 } });

test('Scrolls', async ({ page }) => {
    await page.goto('http://localhost:3000/vertical');
    
    expect(await page.locator(nToString(0)).count()).toEqual(1);
    expect(await page.locator(nToString(1)).count()).toEqual(1);
    expect(await page.locator(nToString(2)).count()).toEqual(1);
    expect(await page.locator(nToString(3)).count()).toEqual(1);
    await page.waitForSelector(nToString(4))
    await page.waitForSelector(nToString(5))


    await page.evaluate(() => window.scrollTo(0, 245))

    for (let i = 6; i !== 25; i++) {
        await page.mouse.wheel(0, 238)

        await page.waitForSelector(nToString(i))
        await page.waitForNotSelector(nToString(i + 2))
        await page.waitForSelector(nToString(i - 5))
        await page.waitForNotSelector(nToString(i - 6))
    }

    for(let i = 24; i !== 6; i--) {
        await page.mouse.wheel(0, -238)
        await page.waitForSelector(nToString(i - 1))
        await page.waitForSelector(nToString(i - 6))
        await page.waitForNotSelector(nToString(i ))
        await page.waitForNotSelector(nToString(i - 7))
    }

    for (let i = 6; i !== 16; i++) {
        await page.mouse.wheel(0, 238)
        await page.waitForSelector(nToString(i))
        await page.waitForNotSelector(nToString(i + 2))
        await page.waitForSelector(nToString(i - 5))
        await page.waitForNotSelector(nToString(i - 6))
    }


    for(let i = 16; i !== 6; i--) {
        await page.mouse.wheel(0, -238)
        await page.waitForSelector(nToString(i - 1))
        await page.waitForSelector(nToString(i - 6))
        await page.waitForNotSelector(nToString(i ))
        await page.waitForNotSelector(nToString(i - 7))
    }
})