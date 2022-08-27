import cacheNewExpirationTimeout from "./cacheNewExpirationTimeout"
import { expireTimeout } from "./maps"

export default function cacheExtendExpirationTimeout({ key, cache, item }) {
    const expire = expireTimeout.get(key)

    if (!expire) {
        return
    }
    clearTimeout(expire)
    cacheNewExpirationTimeout({ cache, key, item })
}