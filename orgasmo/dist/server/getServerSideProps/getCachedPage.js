"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cacheGet_1 = require("../cache/cacheGet");
const getPageCacheKeys_1 = require("./getPageCacheKeys");
async function getCachedPage(ctx) {
    const keys = await (0, getPageCacheKeys_1.default)(ctx);
    for await (const key of keys) {
        const pageConfig = await (0, cacheGet_1.default)({ ctx, key });
        if (pageConfig) {
            return {
                key,
                pageConfig,
            };
        }
    }
    return {};
}
exports.default = getCachedPage;
//# sourceMappingURL=getCachedPage.js.map