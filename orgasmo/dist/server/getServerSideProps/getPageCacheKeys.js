"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cencode_1 = require("cencode");
const events_1 = require("../events");
async function* getPageCacheKeys(ctx) {
    try {
        const methods = await ctx.drivers.page.allParameterMethods?.(ctx);
        if (methods) {
            for (const method of methods) {
                yield (0, cencode_1.cencode)(await ctx.drivers[method](ctx));
            }
        }
    }
    catch (error) {
        events_1.default.emit("error", {
            type: "driver",
            method: "page.allParameterMethods",
            params: [ctx],
            error,
        });
    }
    yield (0, cencode_1.cencode)({
        params: ctx.params,
        roles: ctx.req.user.roles,
        labels: ctx.req.labels,
    });
}
exports.default = getPageCacheKeys;
//# sourceMappingURL=getPageCacheKeys.js.map