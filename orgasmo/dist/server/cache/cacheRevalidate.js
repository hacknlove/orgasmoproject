"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const maps_1 = require("./maps");
const cacheNewAutoRefreshInterval_1 = require("./cacheNewAutoRefreshInterval");
const events_1 = require("../events");
const timechunks_1 = require("../lib/timechunks");
const cacheExtendExpirationTimeout_1 = require("./cacheExtendExpirationTimeout");
async function cacheRevalidate({ ctx, key, item }) {
    let newItem;
    try {
        newItem = await ctx.driver[item.revalidate](key);
    }
    catch (error) {
        events_1.default.emit("error", {
            type: "driver",
            method: item.revalidate,
            error,
            params: [key],
        });
    }
    if (!newItem) {
        return;
    }
    (0, cacheExtendExpirationTimeout_1.default)({ ctx, key, item: newItem });
    if (newItem.revalidate) {
        const timeChunk = (0, timechunks_1.currentTimeChunk)(item.timeChunk);
        maps_1.nextRevalidation.set(key, timeChunk.revalidate);
    }
    else {
        maps_1.nextRevalidation.delete(key);
    }
    clearInterval(maps_1.autoRefreshInterval.get(key));
    maps_1.autoRefreshInterval.delete(key);
    if (newItem.autoRefresh) {
        clearInterval(maps_1.autoRefreshInterval.get(key));
        (0, cacheNewAutoRefreshInterval_1.default)({ ctx, key, item: newItem });
    }
    ctx.cache.set(key, newItem);
}
exports.default = cacheRevalidate;
//# sourceMappingURL=cacheRevalidate.js.map