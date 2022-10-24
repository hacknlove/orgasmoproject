"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cacheExpireItem_1 = require("./cacheExpireItem");
const cacheHitItem_1 = require("./cacheHitItem");
async function cacheGet({ ctx, key }) {
    const item = await ctx.cache.get(key);
    if (!item) {
        return null;
    }
    if (item.timeChunk.expire < Date.now()) {
        (0, cacheExpireItem_1.default)({ ctx, key });
        return null;
    }
    (0, cacheHitItem_1.default)({ ctx, key, item });
    return item;
}
exports.default = cacheGet;
//# sourceMappingURL=cacheGet.js.map