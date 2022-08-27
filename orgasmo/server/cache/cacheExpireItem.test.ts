import cacheExpireItem from './cacheExpireItem'
import { autoRefreshInterval, expireTimeout, nextRevalidation } from './maps'

describe('expireItem', () => {
    it('clears everything', async () => {
        const key = expect.getState().currentTestName

        autoRefreshInterval.set(key, setInterval(() => {
            throw ('This should have been canceled')
        }, 10))
        expireTimeout.set(key, setInterval(() => {
            throw ('This should have been canceled')
        }, 10))
        nextRevalidation.set(key, 123)

        const cache = new Map([[ key, 'some item' ]])

        cacheExpireItem({ cache, key })

        expect(cache.has(key)).toBe(false)
        await new Promise(resolve => setTimeout(resolve, 20))
        expect(true).toBe(true)
    })
})