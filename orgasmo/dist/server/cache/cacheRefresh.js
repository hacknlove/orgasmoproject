"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("../events");
const cacheExpireItem_1 = require("./cacheExpireItem");
const cacheNewAutoRefreshInterval_1 = require("./cacheNewAutoRefreshInterval");
const maps_1 = require("./maps");
async function cacheRefresh({ ctx, item, key }) {
    let newItem;
    try {
        newItem = await ctx.driver[item.autoRefresh.method](key);
    }
    catch (error) {
        events_1.default.emit("error", {
            type: "driver",
            method: item.autoRefresh.method,
            params: [key],
            error,
        });
    }
    if (!newItem) {
        (0, cacheExpireItem_1.default)({ ctx, key });
        return;
    }
    if (newItem.revalidate) {
        maps_1.nextRevalidation.set(key, Date.now());
    }
    else if (!item.revalidate) {
        maps_1.nextRevalidation.delete(key);
    }
    if (!newItem.autoRefresh) {
        clearInterval(maps_1.autoRefreshInterval.get(key));
        maps_1.autoRefreshInterval.delete(key);
    }
    else if (newItem.autoRefresh.method !== item.autoRefresh.method ||
        newItem.autoRefresh.ms !== item.autoRefresh.ms) {
        clearInterval(maps_1.autoRefreshInterval.get(key));
        (0, cacheNewAutoRefreshInterval_1.default)({ ctx, key, item: newItem });
    }
    ctx.cache.set(key, newItem);
}
exports.default = cacheRefresh;
//# sourceMappingURL=cacheRefresh.js.map