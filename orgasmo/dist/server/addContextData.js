"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deepmerge_1 = require("@fastify/deepmerge");
const events_1 = require("./events");
const deepmerge = (0, deepmerge_1.default)({
    mergeArray: (options) => (target, source) => options.clone(source),
});
async function addContextData(ctx, getContextData) {
    ctx.contextData ?? (ctx.contextData = {});
    if (!getContextData) {
        return;
    }
    if (typeof getContextData === 'string') {
        getContextData = [getContextData];
    }
    for (const method of getContextData) {
        if (typeof ctx.driver[method] !== 'function')
            continue;
        try {
            deepmerge(ctx.contextData, await ctx.driver(method)(ctx, ctx));
        }
        catch (error) {
            events_1.default.emit("error", {
                type: "driver",
                method,
                params: [ctx, getContextData],
                error,
            });
            return {
                notFound: true,
            };
        }
    }
}
exports.default = addContextData;
//# sourceMappingURL=addContextData.js.map