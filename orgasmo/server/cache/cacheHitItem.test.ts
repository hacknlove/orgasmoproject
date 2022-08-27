import cacheHitItem from './cacheHitItem'
import { nextRevalidation } from './maps'
import cacheExtendExpirationTimeout from './cacheExtendExpirationTimeout'
import cacheRevalidate from "./cacheRevalidate";

jest.mock('./cacheExtendExpirationTimeout', () => ({
    _esModule: true,
    default: jest.fn()
}))
jest.mock('./cacheRevalidate', () => ({
    _esModule: true,
    default: jest.fn()
}))

describe('cacheHitItem', () => {
    let key
    let item
    let driver
    let cache
    beforeEach(() => {
        key = expect.getState().currentTestName
        cache = new Map()
        item = { key }
        driver = {}
    })
    it('extends expiration', () => {
        cacheHitItem({ cache, key, item, driver })

        expect(cacheExtendExpirationTimeout).toHaveBeenCalledWith({
            cache, key, item
        })
    })
    it('does not revalidate if item has no revalidate', () => {
        cacheHitItem({ cache, key, item, driver })
        expect(cacheRevalidate).not.toHaveBeenCalled()
    })

    it('not revalidates before time', () => {
        item = {
            timeChunk: {
                revalidate: 100,
                expire: 1000
            },
            revalidate: 'foo'
        }
        nextRevalidation.set(key, Date.now() + 500)

        cacheHitItem({ key, item, driver, cache })
        expect(cacheRevalidate).not.toHaveBeenCalled()
    })
    it('revalidates after time', () => {
        item = {
            timeChunk: {
                revalidate: 100,
                expire: 1000
            },
            revalidate: 'foo'
        }
        nextRevalidation.set(key, Date.now() - 500)

        cacheHitItem({ key, item, driver, cache })
        expect(cacheRevalidate).toHaveBeenCalled()
    })
})