import { autoRefreshInterval, nextRevalidation } from "./maps"
import cacheNewAutoRefreshInterval from './cacheNewAutoRefreshInterval'
import events from "../events"
import { currentTimeChunk } from "../lib/timechunks"
import cacheExtendExpirationTimeout from "./cacheExtendExpirationTimeout"
export default async function cacheRevalidate({ ctx, key, item }) {
    let newItem
    try {
        newItem = await ctx.driver[item.revalidate](key)
    } catch (error) {
        events.emit('error', {
            method: item.revalidate,
            error,
            params: [key]
        })
    }
    if (!newItem) {
        return
    }

    cacheExtendExpirationTimeout({ ctx, key, item: newItem })

    
    if (newItem.revalidate) {
        const timeChunk = currentTimeChunk(item.timeChunk)
        nextRevalidation.set(key, timeChunk.revalidate)
    } else {
        nextRevalidation.delete(key)
    }

    clearInterval(autoRefreshInterval.get(key))
    autoRefreshInterval.delete(key)

    if (newItem.autoRefresh) {
        clearInterval(autoRefreshInterval.get(key))
        cacheNewAutoRefreshInterval({ ctx, key, item: newItem })
    }

    ctx.cache.set(key, newItem)
}