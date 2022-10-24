"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cacheNewAutoRefreshInterval_1 = require("../cache/cacheNewAutoRefreshInterval");
const cacheNewExpirationTimeout_1 = require("../cache/cacheNewExpirationTimeout");
const maps_1 = require("../cache/maps");
const timechunks_1 = require("./timechunks");
function cacheNewItem({ ctx, key, item }) {
    if (item.noCache || !item.timeChunk || ctx.noCache) {
        return;
    }
    if (item.autoRefresh) {
        (0, cacheNewAutoRefreshInterval_1.default)({ ctx, key, item });
    }
    (0, cacheNewExpirationTimeout_1.default)({ ctx, key, item });
    if (item.revalidate) {
        maps_1.nextRevalidation.set(key, (0, timechunks_1.currentTimeChunk)().revalidate);
    }
    return ctx.cache.set(key, item);
}
exports.default = cacheNewItem;
//# sourceMappingURL=cacheNewItem.js.map