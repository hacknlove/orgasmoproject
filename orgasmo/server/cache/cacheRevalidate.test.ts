import cacheRevalidate from './cacheRevalidate'
import { autoRefreshInterval } from './maps'
import events from '../events'
import cacheExtendExpirationTimeout from './cacheExtendExpirationTimeout'

jest.mock('../events', () => ({
    __esModule: true,
    default: {
        emit: jest.fn()
    }
}))
jest.mock('./cacheExtendExpirationTimeout', () => ({
    __esModule: true,
    default: jest.fn()
}))

describe('cacheRevalidate', () => {
    let key
    let item
    let cache
    let driver
    let newItem
    beforeEach(() => {
        key = expect.getState().currentTestName
        item = { revalidate: 'foo' }
        newItem = {}
        driver = {
            foo: () => newItem
        }
        cache = new Map([
            [key, item]
        ])
    })
    it('does nothing if the method fails', async () => {
        driver.foo = () => Promise.reject('error')
        await cacheRevalidate({ key, driver, cache, item })

        expect(events.emit).toHaveBeenCalled()

        expect(cache.has(key)).toBe(true)
    })
    it('does nothing if the method returns falsy', async () => {
        driver.foo = () => null

        await cacheRevalidate({ key, driver, cache, item })

        expect(cache.has(key)).toBe(true)
    })
    it('caches the item', async () => {
        await cacheRevalidate({ key, driver, cache, item })

        expect(cache.get(key)).toEqual(newItem)
    })
    it('updates the revalidate and expire times', async () => {
        newItem.timeChunk = {
            revalidate: 500,
            expire: 1000
        }
        newItem.revalidate = 'fuu'
        await cacheRevalidate({ key, driver, cache, item })
        expect(cacheExtendExpirationTimeout).toHaveBeenCalled()
        expect(cache.get(key)).toEqual(newItem)
    })
    it('sets the autoRefresh', async () => {
        newItem.autoRefresh = {
            method: 'fii',
            ms: 1234
        }

        await cacheRevalidate({ key, driver, cache, item })

        expect(autoRefreshInterval.has(key)).toBe(true)
    })


})
