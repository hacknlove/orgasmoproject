"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../../lib/config");
const events_1 = require("../../events");
const getPage_1 = require("../getPage");
function rewrite({ ctx, rewrite, key }) {
    if (!ctx.original) {
        ctx.original = {
            roles: ctx.req.user.roles,
            params: ctx.params,
            query: ctx.query,
            key,
        };
    }
    ctx.rewrites = (ctx.rewrites ?? 0) + 1;
    if (ctx.rewrites > config_1.MAX_REWRITES) {
        events_1.default.emit("MAX_REWRITES", {
            original: ctx.original,
            ctx,
            rewrite: rewrite,
        });
        return {
            notFound: true,
        };
    }
    return (0, getPage_1.default)(ctx);
}
exports.default = rewrite;
//# sourceMappingURL=rewrite.js.map