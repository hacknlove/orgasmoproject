import {
    autoRefreshInterval,
    expireTimeout,
    lastRevalidation,
    newExpirationTimeout,
    refresh,
    newAutoRefreshInterval,
    extendExpirationTimeout,
    cacheNewItem,
    cacheItemHit,
    revalidate,
    cacheExpireItem
} from './cache';

describe('cache', () => {
    it('expiration cleans stuff', async () => {
        const key = expect.getState().currentTestName
        const cache = new Map([[key, 'test-item']])
        lastRevalidation.set(key, 123)

        autoRefreshInterval.set(key, setInterval(() => {
            throw new Error('The interval should have been canceled')
        }, 10))

        expireTimeout.set(key, setInterval(() => {
            throw new Error('The timeout should have been canceled')
        }, 10))

        cacheExpireItem({ key: key, cache })

        expect(cache.has(key)).toBeFalsy()
        expect(autoRefreshInterval.has(key)).toBeFalsy()
        expect(expireTimeout.has(key)).toBeFalsy()
        expect(lastRevalidation.has(key)).toBeFalsy()

        await new Promise(resolve => setTimeout(resolve, 20))
    })
})

describe('newExpirationTimeout', () => {
    const cache = new Map()
    
    it('sets a expiration', async () => {
        const key = expect.getState().currentTestName
        newExpirationTimeout({
            cache,
            key,
            item: {
                expire: 10
            }
        })

        expect(expireTimeout.has(key)).toBeTruthy()
        await new Promise(resolve => setTimeout(resolve, 20))
        expect(expireTimeout.has(key)).toBeFalsy()
    })
})

describe('refresh', () => {
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

        await refresh({ driver, item, cache, key: key})

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
        await refresh({ driver, item, cache, key: key})
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
        await refresh({ driver, item, cache, key: key})
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

        await refresh({ driver, item, cache, key: key})
        expect(lastRevalidation.has(key))
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

        await refresh({ driver, item, cache, key: key})
        expect(autoRefreshInterval.has(key))
    })




})

describe('newAutoRefreshInterval', () => {
    const cache = new Map()
    
    it('sets an interval', async () => {
        const key = expect.getState().currentTestName
        newAutoRefreshInterval({
            cache,
            key,
            driver: {
                'someAutorefresh.method': () => {}
            },
            item: {
                autoRefresh: {
                    method: 'someAutorefresh.method',
                    ms: 10
                }
            }
        })

        expect(autoRefreshInterval.has(key)).toBeTruthy()
        await new Promise(resolve => setTimeout(resolve, 20))
        expect(autoRefreshInterval.has(key)).toBeFalsy()
    })
})

describe('extendExpirationTimeout', () => {
    it('does nothing if there is no expiration to extend', () => {
        const key = expect.getState().currentTestName
        const cache = new Map()
        extendExpirationTimeout({ key, cache, item: key })

        expect(expireTimeout.has(key)).toBeFalsy()
    })
    it('clears old expiration and sets a new one', async () => {
        const key = expect.getState().currentTestName
        const currentTimeout = setTimeout(() => { throw new Error('this should have been canceled')}, 10 ) as unknown as number
        const cache = new Map()

        expireTimeout.set(key, currentTimeout)
        
        extendExpirationTimeout({ key, cache, item: {
            expire: 1000
        } })
        await new Promise(resolve => setTimeout(resolve, 20))

        expect(expireTimeout.get(key)).not.toBe(currentTimeout)
    })
})

describe('cacheNewItem', () => {
    it('adds the item to the cache', () => {
        const key = expect.getState().currentTestName
        const driver = {}
        const cache = new Map()
        const item = {}

        cacheNewItem({ key, driver, cache, item })

        expect(cache.get(key)).toEqual(item)
        expect(expireTimeout.has(key)).toBeFalsy()
        expect(autoRefreshInterval.has(key)).toBeFalsy()
        expect(lastRevalidation.has(key)).toBeFalsy()
    })

    it('adds autoRefresh, if item asks for it', () => {
        const key = expect.getState().currentTestName
        const driver = {}
        const cache = new Map()
        const item = {
            autoRefresh: {
                ms: 1000
            }
        }

        cacheNewItem({ key, driver, cache, item })

        expect(autoRefreshInterval.has(key)).toBeTruthy()
    })

    it('adds expiration, if item asks for it', () => {
        const key = expect.getState().currentTestName
        const driver = {}
        const cache = new Map()
        const item = {
            expire: 1000
        }

        cacheNewItem({ key, driver, cache, item })

        expect(expireTimeout.has(key)).toBeTruthy()
    })

    it('sets lastRevalidation, if item asks for it', () => {
        const key = expect.getState().currentTestName
        const driver = {}
        const cache = new Map()
        const item = {
            revalidate: {
                ms: 1000
            }
        }

        cacheNewItem({ key, driver, cache, item })

        expect(lastRevalidation.has(key)).toBeTruthy()
    })
})

describe('revalidate', () => {
    it('does nothing if the method fails', async () => {
        const key = expect.getState().currentTestName
        const item = { revalidate: {
            method: 'foo'
        }}
        const driver = {
            foo: () => Promise.reject('error')
        }

        const cache = new Map([
            [key, item]
        ])

        await revalidate({ key, driver, cache, item })

        expect(cache.has(key)).toBe(true)
    })
    it('does nothing if the method returns falsy', async () => {
        const key = expect.getState().currentTestName
        const item = { revalidate: {
            method: 'foo'
        }}
        const driver = {
            foo: () => null
        }

        const cache = new Map([
            [key, item]
        ])

        await revalidate({ key, driver, cache, item })

        expect(cache.has(key)).toBe(true)
    })
    it('caches the item', async () => {
        const key = expect.getState().currentTestName
        const item = { revalidate: {
            method: 'foo'
        }}
        const newItem = {}
        const driver = {
            foo: () => newItem
        }

        const cache = new Map([
            [key, item]
        ])

        await revalidate({ key, driver, cache, item })

        expect(cache.get(key)).toEqual(newItem)
    })
    it('updates the revalidation time', async () => {
        const key = expect.getState().currentTestName
        const item = { revalidate: {
            method: 'foo',
        }}
        const newItem = {
            revalidate: {
                method: 'fii'
            }
        }
        const driver = {
            foo: () => newItem
        }

        const cache = new Map([
            [key, item]
        ])

        await revalidate({ key, driver, cache, item })

        expect(cache.get(key)).toEqual(newItem)
    })
    it('sets the autoRefresh', async () => {
        const key = expect.getState().currentTestName
        const item = { revalidate: {
            method: 'foo',
        }}
        const newItem = {
            autoRefresh: {
                method: 'fii',
                ms: 1234
            }
        }
        const driver = {
            foo: () => newItem
        }

        const cache = new Map([
            [key, item]
        ])

        await revalidate({ key, driver, cache, item })

        expect(autoRefreshInterval.has(key)).toBe(true)
    })


})

describe('cacheItemHit', () => {
    it('extends expiration', () => {
        const key = expect.getState().currentTestName
        const item = {
            expire: 1000
        }
        const driver = {}
        const cache = new Map()

        expireTimeout.set(key, 'foo')

        cacheItemHit({ key, item, driver, cache })
        expect(expireTimeout.get(key)).not.toBe('foo')
    })

    it('revalidates', async () => {
        const key = expect.getState().currentTestName
        const item = {
            revalidate: {
                ms: 100,
                method: 'foo'
            }
        }
        lastRevalidation.set(key, 0)
        const driver = { foo: () => item }
        const cache = new Map()


        await cacheItemHit({ key, item, driver, cache })
        expect(lastRevalidation.get(key)).not.toBe(0)
    })
})

describe.skip('cacheExpireItem', () => {
    
})

