import events from "../events"

const Cache = new Map()

export default async function cacheFactory (driver) {
    try {
        return await driver.cache?.factory?.() ?? Cache
    } catch (error) {
        events.emit('error', {
            method: 'cache.factory',
            error
        })
    }
    return Cache
}