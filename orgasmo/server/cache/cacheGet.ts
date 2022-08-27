import cacheExpireItem from "./cacheExpireItem"
import cacheHitItem from './cacheHitItem'

export default async function cacheGet({ cache, driver, key }) {
    const item = await cache.get(key)

    if (!item) {
        return null
    }

    if (item.timeChunk.expire < Date.now()) {
        cacheExpireItem({ cache, key })
        return null
    }

    cacheHitItem({ cache, driver, key, item })
    return item
}