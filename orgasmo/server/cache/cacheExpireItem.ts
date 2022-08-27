import { autoRefreshInterval, expireTimeout, nextRevalidation } from "./maps"
export default function cacheExpireItem({ cache, key }) {
    clearInterval(autoRefreshInterval.get(key))
    clearTimeout(expireTimeout.get(key))
    expireTimeout.delete(key)
    nextRevalidation.delete(key)
    autoRefreshInterval.delete(key)
    cache.delete(key)
}