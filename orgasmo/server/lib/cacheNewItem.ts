export function cacheNewItem({ driver, cache, key, item }) {
    if (item.noCache) {
        return
    }
    if (item.autoRefresh) {
        cacheNewAutoRefreshInterval({ driver, cache, key, item })
    }

    if (item.timeChunk.expire) {
        newExpirationTimeout({ cache, key, item })
    }

    if (item.revalidate) {
        nextRevalidation.set(key, new Date())
    }
    return cache.set(key, item)
}