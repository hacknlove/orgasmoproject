import { autoRefreshInterval, expireTimeout, nextRevalidation } from "./maps"
export default function cacheExpireItem({ ctx, key }) {
    clearInterval(autoRefreshInterval.get(key))
    clearTimeout(expireTimeout.get(key))
    expireTimeout.delete(key)
    nextRevalidation.delete(key)
    autoRefreshInterval.delete(key)
    ctx.cache.delete(key)
}