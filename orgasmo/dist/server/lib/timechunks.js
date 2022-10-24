"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maxTimeChunk = exports.currentTimeChunk = void 0;
const config_1 = require("./config");
function currentTimeChunk({ cacheExpiration = config_1.CACHE_EXPIRATION, cacheRenew = config_1.CACHE_RENEW, } = {}) {
    const now = Date.now();
    const start = now - (now % cacheRenew);
    const revalidate = start + cacheRenew;
    const expire = start + cacheExpiration;
    return { revalidate, expire };
}
exports.currentTimeChunk = currentTimeChunk;
function maxTimeChunk({ timeChunkConf, timeChunk, }) {
    if (!timeChunkConf) {
        return timeChunk;
    }
    const cacheRenew = timeChunkConf.cacheRenew ?? config_1.CACHE_RENEW;
    const cacheExpiration = timeChunkConf.cacheExpiration ?? config_1.CACHE_EXPIRATION;
    const now = Date.now();
    const start = now - (now % cacheRenew);
    const revalidate = Math.max(timeChunk.revalidate, start + cacheRenew);
    const expire = Math.max(timeChunk.expire, start + cacheExpiration);
    return { revalidate, expire };
}
exports.maxTimeChunk = maxTimeChunk;
//# sourceMappingURL=timechunks.js.map