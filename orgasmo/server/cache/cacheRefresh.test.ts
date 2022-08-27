import cacheRefresh from './cacheRefresh'
import { autoRefreshInterval, nextRevalidation } from './maps'

describe('cacheRefresh', () => {
    it('fetch a new item', async () => {
        const key = expect.getState().currentTestName
        const item = {
            foo: 'foo',
            autoRefresh: {
                method: 'some.method',
                ms: 1000
            }
        }
        const cache = new Map([[ key, item ]])
        const newItem = {
            bar: 'bar'
        }
        const driver = {
            'some.method': jest.fn(() => newItem)
        }

        await cacheRefresh({ driver, item, cache, key: key})

        expect(cache.get(key)).toEqual(newItem)
    })

    it('expires if no new item is returned', async () => {
        const key = expect.getState().currentTestName
        const item = {
            foo: 'foo',
            autoRefresh: {
                method: 'some.method',
                ms: 1000
            }
        }
        const cache = new Map([[ key, item ]])
        const driver = {
            'some.method': jest.fn(() => null)
        }
        autoRefreshInterval.set(key, 0)
        await cacheRefresh({ driver, item, cache, key: key})
        expect(cache.has(key)).toBeFalsy()
        expect(autoRefreshInterval.has(key)).toBeFalsy()
    })

    it('expires if drivers throws', async () => {
        const key = expect.getState().currentTestName
        const item = {
            foo: 'foo',
            autoRefresh: {
                method: 'some.method',
                ms: 1000
            }
        }
        const cache = new Map([[ key, item ]])
        const driver = {
            'some.method': jest.fn(() => { throw new Error() })
        }
        autoRefreshInterval.set(key, 0)
        await cacheRefresh({ driver, item, cache, key: key})
        expect(cache.has(key)).toBeFalsy()
        expect(autoRefreshInterval.has(key)).toBeFalsy()
    })

    it('updates the revalidation time, if the item revalidates', async () => {
        const key = expect.getState().currentTestName

        const item = {
            foo: 'foo',
            autoRefresh: {
                method: 'some.method',
                ms: 1000
            },
        }
        const newItem = {
            foo: 'foo',
            autoRefresh: {
                method: 'some.method',
                ms: 1000
            },
            revalidate: {
                ms: 1000
            }
        }

        const cache = new Map([[ key, item ]])
        const driver = {
            'some.method': jest.fn(() => newItem)
        }

        await cacheRefresh({ driver, item, cache, key: key})
        expect(nextRevalidation.has(key))
    })

    it('changes the autoRefreshInterval if the newItem wants it different ', async () => {
        const key = expect.getState().currentTestName

        const item = {
            foo: 'foo',
            autoRefresh: {
                method: 'some.method',
                ms: 1000
            },
        }
        const newItem = {
            foo: 'foo',
            autoRefresh: {
                method: 'some.method',
                ms: 2000
            },
        }

        const cache = new Map([[ key, item ]])
        const driver = {
            'some.method': jest.fn(() => newItem)
        }

        await cacheRefresh({ driver, item, cache, key: key})
        expect(autoRefreshInterval.has(key))
    })
})