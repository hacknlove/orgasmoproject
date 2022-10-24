"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const maps_1 = require("./maps");
function cacheNewExpirationTimeout({ ctx, key, item }) {
    const expire = setTimeout(() => {
        clearInterval(maps_1.autoRefreshInterval.get(key));
        maps_1.expireTimeout.delete(key);
        maps_1.nextRevalidation.delete(key);
        maps_1.autoRefreshInterval.delete(key);
        ctx.cache.delete(key);
    }, Date.now() + item.timeChunk.expire);
    maps_1.expireTimeout.set(key, expire);
}
exports.default = cacheNewExpirationTimeout;
//# sourceMappingURL=cacheNewExpirationTimeout.js.map