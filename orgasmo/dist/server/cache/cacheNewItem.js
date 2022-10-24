"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cacheNewAutoRefreshInterval_1 = require("./cacheNewAutoRefreshInterval");
const cacheNewExpirationTimeout_1 = require("./cacheNewExpirationTimeout");
const maps_1 = require("./maps");
function cacheNewItem({ ctx, key, item }) {
    if (!item.timeChunk || ctx.noCache) {
        return;
    }
    if (item.autoRefresh) {
        (0, cacheNewAutoRefreshInterval_1.default)({ ctx, key, item });
    }
    (0, cacheNewExpirationTimeout_1.default)({ ctx, key, item });
    if (item.revalidate) {
        maps_1.nextRevalidation.set(key, new Date());
    }
    return ctx.cache.set(key, item);
}
exports.default = cacheNewItem;
//# sourceMappingURL=cacheNewItem.js.map