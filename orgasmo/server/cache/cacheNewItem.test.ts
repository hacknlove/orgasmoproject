import cacheNewItem from './cacheNewItem'
import cacheNewAutoRefreshInterval from "./cacheNewAutoRefreshInterval"
import cacheNewExpirationTimeout from "./cacheNewExpirationTimeout"
import { nextRevalidation } from "./maps"

jest.mock('./cacheNewAutoRefreshInterval', () => ({
    __esModule: true,
    default: jest.fn()
}))

jest.mock('./cacheNewExpirationTimeout', () => ({
    __esModule: true,
    default: jest.fn()
}))

describe('cacheNewItem', () => {
    let key
    let driver
    let cache
    let item
    beforeEach(() => {
        key = expect.getState().currentTestName
        driver = {}
        cache = new Map()
        item = {}
    })
    it('adds the expiration timeout', () => {
        cacheNewItem({cache, driver, item, key })

        expect(cacheNewAutoRefreshInterval).not.toHaveBeenCalled()
        expect(cacheNewExpirationTimeout).toHaveBeenCalled()
        expect(nextRevalidation.has(key)).toBe(false)
    })

    it('adds the autoRefresh interval', () => {
        item.autoRefresh = true
        cacheNewItem({cache, driver, item, key })

        expect(cacheNewAutoRefreshInterval).toHaveBeenCalled()
    })

    it('sets the nextRevalidation timestamp', () => {
        item.revalidate = 'method'
        cacheNewItem({cache, driver, item, key })

        expect(nextRevalidation.has(key)).toBe(true)
    })

})