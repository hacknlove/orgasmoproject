import cacheNewAutoRefreshInterval from "./cacheNewAutoRefreshInterval"
import cacheNewExpirationTimeout from "./cacheNewExpirationTimeout"
import { nextRevalidation } from "./maps"

export default function cacheNewItem({ driver, cache, key, item }) {
    if (item.autoRefresh) {
        cacheNewAutoRefreshInterval({ driver, cache, key, item })
    }

    cacheNewExpirationTimeout({ cache, key, item })

    if (item.revalidate) {
        nextRevalidation.set(key, new Date())
    }
    return cache.set(key, item)
}