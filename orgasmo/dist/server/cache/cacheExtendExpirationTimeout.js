"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cacheNewExpirationTimeout_1 = require("./cacheNewExpirationTimeout");
const maps_1 = require("./maps");
function cacheExtendExpirationTimeout({ ctx, key, item }) {
    const expire = maps_1.expireTimeout.get(key);
    if (!expire) {
        return;
    }
    clearTimeout(expire);
    (0, cacheNewExpirationTimeout_1.default)({ ctx, key, item });
}
exports.default = cacheExtendExpirationTimeout;
//# sourceMappingURL=cacheExtendExpirationTimeout.js.map