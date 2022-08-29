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
    let ctx 
    let driver
    let key
    
    beforeEach(() => {
        ctx = {
            driver: {},
            cache: new Map
        }
        key = expect.getState().currentTestName
    })

    it('returns null if no item is found on the cache', async () => {
        expect(await cacheGet({ ctx, key })).toBeNull()
    })

    it('expires item, if expired', async () => {
        ctx.cache.set(key, {
            timeChunk: {
                expire: 0
            }
        })

        expect(await cacheGet({ ctx, key })).toBeNull()

        expect(cacheExpireItem).toHaveBeenCalledWith({ ctx, key })
    })

    it('hits the item if found and not expired', async () => {
        const item = {
            timeChunk: {
                expire: Date.now() + 1000
            }
        }

        ctx.cache.set(key, item)

        expect(await cacheGet({ ctx, key })).toBe(item)
        expect(cacheHitItem).toHaveBeenCalledWith({ ctx, key, item })

    })
})