import { autoRefreshInterval, expireTimeout, nextRevalidation } from "./maps"

export default function cacheNewExpirationTimeout({ cache, key, item }) {
    const expire = setTimeout(() => {
        clearInterval(autoRefreshInterval.get(key))
        expireTimeout.delete(key)
        nextRevalidation.delete(key)
        autoRefreshInterval.delete(key)
        cache.delete(key)
    }, Date.now() + item.timeChunk.expire)

    expireTimeout.set(key, expire)
}