"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cencode_1 = require("cencode");
const events_1 = require("../events");
async function* getPageCacheKeys(ctx) {
    try {
        const methods = await ctx.driver.page.allParameterMethods?.(ctx);
        if (methods) {
            for (const method of methods) {
                yield (0, cencode_1.cencode)(await ctx.driver[method](ctx));
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
    yield (0, cencode_1.cencode)({ params: ctx.params, roles: ctx.req.user.roles });
}
exports.default = getPageCacheKeys;
//# sourceMappingURL=getPageCacheKeys.js.map