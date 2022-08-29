// @ts-nocheck
import cacheFactory from './cacheFactory'
import events from '../events'

jest.mock('../events', () => ({
    __esModule: true,
    default: {
        emit: jest.fn()
    }
}))

describe('cacheFactory', () => {
    it ('return the cache from the driver', async () => {
        const ctx = {
            driver : {
                cache: {
                    factory: () => 'Cache from the driver'
                }
            }
        }
        await cacheFactory(ctx)
        
        expect(ctx.cache).toBe('Cache from the driver')
    })
    it ('return the default cache, if the driver has no cache', async () => {
        const ctx = {
            driver: {
                cache: {
                    factory: () => null
                }
            }
        }
        await cacheFactory(ctx)

        expect(ctx.cache).toBeInstanceOf(Map)
    })
    it ('return the default cache, if the driver has no cache factory', async () => {
        const ctx = {
            driver: {
            }
        }
        await cacheFactory(ctx)

        expect(ctx.cache).toBeInstanceOf(Map)
    })
    it ('triggers error event if factory errors, and fallbacks to defauls', async () => {
        const ctx = {
            driver: {
                cache: {
                    factory: () => Promise.reject('The error')
                }
            }
        }

        await cacheFactory(ctx)

        expect(ctx.cache).toBeInstanceOf(Map)
        expect(events.emit).toBeCalled()
    })
})