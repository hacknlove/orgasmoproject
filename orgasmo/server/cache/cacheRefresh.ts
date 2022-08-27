import cacheExpireItem from "./cacheExpireItem"
import newAutoRefreshInterval from "./cacheNewAutoRefreshInterval"
import { autoRefreshInterval, nextRevalidation } from "./maps"

export default async function cacheRefresh ({ driver, item, key, cache }) {
    let newItem
    try {
        newItem = await driver[item.autoRefresh.method](key)
    } catch {}
    if (!newItem) {
        cacheExpireItem({ key, cache })
        return
    }
    if (newItem.revalidate) {
        nextRevalidation.set(key, Date.now())
    } else if (!item.revalidate) {
        nextRevalidation.delete(key)
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
