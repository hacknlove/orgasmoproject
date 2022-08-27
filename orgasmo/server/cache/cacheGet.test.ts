import cacheGet from './cacheGet';
import cacheExpireItem from './cacheExpireItem';
import cacheHitItem from './cacheHitItem'

jest.mock('./cacheExpireItem', () => ({
    _esModule: true,
    default: jest.fn()
}))
jest.mock('./cacheHitItem', () => ({
    _esModule: true,
    default: jest.fn()
}))


describe('cacheGet', () => {
    let driver
    let key
    
    beforeEach(() => {
        driver = {}
        key = expect.getState().currentTestName
    })

    it('returns null if no item is found on the cache', async () => {
        const cache = new Map()
        expect(await cacheGet({ cache, driver, key })).toBeNull()
    })

    it('expires item, if expired', async () => {
        const cache = new Map()
        cache.set(key, {
            timeChunk: {
                expire: 0
            }
        })

        expect(await cacheGet({ cache, driver, key })).toBeNull()

        expect(cacheExpireItem).toHaveBeenCalledWith({ cache, key })
    })

    it('hits the item if found and not expired', async () => {
        const cache = new Map()
        const item = {
            timeChunk: {
                expire: Date.now() + 1000
            }
        }

        cache.set(key, item)

        expect(await cacheGet({ cache, driver, key })).toBe(item)
        expect(cacheHitItem).toHaveBeenCalledWith({ cache, driver, key, item })

    })
})