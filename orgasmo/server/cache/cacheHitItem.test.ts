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
    let ctx
    beforeEach(() => {
        key = expect.getState().currentTestName
        ctx = {
            cache: new Map(),
            driver: {}
        }
        item = { key }
    })
    it('extends expiration', () => {
        cacheHitItem({ ctx, key, item })

        expect(cacheExtendExpirationTimeout).toHaveBeenCalledWith({
            ctx, key, item
        })
    })
    it('does not revalidate if item has no revalidate', () => {
        cacheHitItem({ ctx, key, item })
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

        cacheHitItem({ ctx, key, item })
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

        cacheHitItem({ ctx, key, item })
        expect(cacheRevalidate).toHaveBeenCalled()
    })
})