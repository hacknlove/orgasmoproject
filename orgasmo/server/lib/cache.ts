export const autoRefreshInterval = new Map()
export const expireTimeout = new Map()
export const lastRevalidation = new Map()

export function newExpirationTimeout({ cache, key, item }) {
    const expire = setTimeout(() => {
        clearInterval(autoRefreshInterval.get(key))
        expireTimeout.delete(key)
        lastRevalidation.delete(key)
        autoRefreshInterval.delete(key)
        cache.delete(key)
    }, Date.now() + item.expire)

    expireTimeout.set(key, expire)
}

export async function refresh ({ driver, item, key, cache }) {
    let newItem
    try {
        newItem = await driver[item.autoRefresh.method](key)
    } catch {}
    if (!newItem) {
        cacheExpireItem({ key, cache })
        return
    }
    if (newItem.revalidate) {
        lastRevalidation.set(key, Date.now())
    } else if (!item.revalidate) {
        lastRevalidation.delete(key)
    }

    if (!newItem.autoRefresh) {
        clearInterval(autoRefreshInterval.get(key))
        autoRefreshInterval.delete(key)
    } else if (newItem.autoRefresh.method !== item.autoRefresh.method || newItem.autoRefresh.ms !== item.autoRefresh.ms) {
        clearInterval(autoRefreshInterval.get(key))
        newAutoRefreshInterval({ cache, key, driver, item: newItem })
    }

    cache.set(key, newItem)
}

export function newAutoRefreshInterval ({ cache, key, driver, item }) {
    const autoRefresh = setInterval(() => refresh({ cache, key, driver, item }), item.autoRefresh.ms
    )

    autoRefreshInterval.set(key, autoRefresh)
}

export function extendExpirationTimeout({ key, cache, item }) {
    const expire = expireTimeout.get(key)

    if (!expire) {
        return
    }
    clearTimeout(expire)
    newExpirationTimeout({ cache, key, item })
}

export function cacheNewItem({ driver, cache, key, item }) {
    if (item.autoRefresh) {
        newAutoRefreshInterval({ driver, cache, key, item })
    }

    if (item.expire) {
        newExpirationTimeout({ cache, key, item })
    }

    if (item.revalidate) {
        lastRevalidation.set(key, new Date())
    }
    return cache.set(key, item)
}

export async function revalidate({ driver, cache, key, item }) {
    let newItem
    try {
        newItem = await driver[item.revalidate.method](key)
    } catch {}
    if (!newItem) {
        return
    }
    if (newItem.revalidate) {
        lastRevalidation.set(key, Date.now())
    } else {
        lastRevalidation.delete(key)
    }

    clearInterval(autoRefreshInterval.get(key))
    autoRefreshInterval.delete(key)

    if (newItem.autoRefresh) {
        clearInterval(autoRefreshInterval.get(key))
        newAutoRefreshInterval({ cache, key, driver, item: newItem })
    }

    cache.set(key, newItem)
}

export function cacheItemHit({ driver, cache, key, item }) {
    if (item.expire) {
        extendExpirationTimeout({ cache, key, item })
    }

    if (!item.revalidate) {
        return
    }

    const needsRevalidation = lastRevalidation.get(key) + item.revalidate.ms < Date.now()

    if (needsRevalidation) {
        revalidate({ driver, cache, key, item })
    }
}

export function cacheExpireItem({ cache, key }) {
    clearInterval(autoRefreshInterval.get(key))
    clearTimeout(expireTimeout.get(key))
    expireTimeout.delete(key)
    lastRevalidation.delete(key)
    autoRefreshInterval.delete(key)
    cache.delete(key)
}
