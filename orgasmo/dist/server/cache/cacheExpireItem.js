"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const maps_1 = require("./maps");
function cacheExpireItem({ ctx, key }) {
    clearInterval(maps_1.autoRefreshInterval.get(key));
    clearTimeout(maps_1.expireTimeout.get(key));
    maps_1.expireTimeout.delete(key);
    maps_1.nextRevalidation.delete(key);
    maps_1.autoRefreshInterval.delete(key);
    ctx.cache.delete(key);
}
exports.default = cacheExpireItem;
//# sourceMappingURL=cacheExpireItem.js.map