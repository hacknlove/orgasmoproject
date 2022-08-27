import cacheNewExpirationTimeout from './cacheNewExpirationTimeout'
import { expireTimeout } from './maps'

describe('cacheNewExpirationTimeout', () => {
    const cache = new Map()
    
    it('sets a expiration', async () => {
        const key = expect.getState().currentTestName
        cacheNewExpirationTimeout({
            cache,
            key,
            item: {
                timeChunk: {
                    expire: 10
                }
            }
        })

        expect(expireTimeout.has(key)).toBeTruthy()
        await new Promise(resolve => setTimeout(resolve, 20))
        expect(expireTimeout.has(key)).toBeFalsy()
    })
})