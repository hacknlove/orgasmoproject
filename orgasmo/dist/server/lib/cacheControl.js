"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function cacheControl({ ctx, item }) {
    if (!item.timeChunk) {
        return;
    }
    ctx.res.setHeader("Cache-Control", `${item.private ? "private" : "public"}, s-maxage=${item.timeChunk.revalidate / 1000}, immutable, must-revalidate, stale-while-revalidate=${item.timeChunk.revalidate / 1000}, stale-if-error=${item.timeChunk.expire / 1000}`);
}
exports.default = cacheControl;
//# sourceMappingURL=cacheControl.js.map