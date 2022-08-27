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
        const driver = {
            cache: {
                factory: () => 'Cache from the driver'
            }
        }
        expect(await cacheFactory(driver)).toBe('Cache from the driver')
    })
    it ('return the default cache, if the driver has no cache', async () => {
        const driver = {
            cache: {
                factory: () => null
            }
        }
        expect(await cacheFactory(driver)).toBeInstanceOf(Map)
    })
    it ('return the default cache, if the driver has no cache factory', async () => {
        const driver = {
        }
        expect(await cacheFactory(driver)).toBeInstanceOf(Map)
    })
    it ('triggers error event if factory errors, and fallbacks to defauls', async () => {
        const driver = {
            cache: {
                factory: () => Promise.reject('The error')
            }
        }

        expect(await cacheFactory(driver)).toBeInstanceOf(Map)
        expect(events.emit).toHaveBeenLastCalledWith('error', { method: 'cache.factory', error: 'The error'})
    })
})