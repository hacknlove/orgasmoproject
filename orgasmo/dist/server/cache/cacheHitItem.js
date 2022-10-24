"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const maps_1 = require("./maps");
const cacheExtendExpirationTimeout_1 = require("./cacheExtendExpirationTimeout");
const cacheRevalidate_1 = require("./cacheRevalidate");
function cacheHitItem({ ctx, key, item }) {
    (0, cacheExtendExpirationTimeout_1.default)({ ctx, key, item });
    if (!item.revalidate) {
        return;
    }
    const needsRevalidation = maps_1.nextRevalidation.get(key) < Date.now();
    if (needsRevalidation) {
        (0, cacheRevalidate_1.default)({ ctx, key, item });
    }
}
exports.default = cacheHitItem;
//# sourceMappingURL=cacheHitItem.js.map