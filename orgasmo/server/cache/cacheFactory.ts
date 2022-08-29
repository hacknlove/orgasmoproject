import events from "../events"

const Cache = new Map()

export default async function cacheFactory (ctx) {
    if (ctx.cache) {
        return;
    }
    try {
        ctx.cache = await ctx.driver.cache?.factory?.() ?? Cache
        return
    } catch (error) {
        events.emit('error', {
            type: 'driver',
            driver: process.env.ORGASMO_DRIVER,
            method: 'cache.factory',
            error
        })    
    }
    ctx.cache = Cache
}