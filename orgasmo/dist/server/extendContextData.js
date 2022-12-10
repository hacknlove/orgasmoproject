"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const deepmerge_1 = require("@fastify/deepmerge");
const events_1 = require("./events");
const deepmerge = (0, deepmerge_1.default)({
    mergeArray: (options) => (target, source) => options.clone(source),
});
async function extendContextData(ctx, params, pageConfig) {
    ctx.contextData = pageConfig.contextData ?? {};
    if (!pageConfig.getContextData) {
        return;
    }
    const methods = typeof pageConfig.getContextData === 'string' ? [pageConfig.getContextData] : pageConfig.getContextData;
    for (const method of methods) {
        if (typeof ctx.driver[method] !== 'function')
            continue;
        try {
            ctx.contextData = deepmerge(ctx.contextData, await ctx.driver[method](ctx, params, pageConfig));
        }
        catch (error) {
            events_1.default.emit("error", {
                type: "driver",
                method,
                params: [ctx, params, pageConfig],
                error,
            });
            return {
                notFound: true,
            };
        }
    }
}
exports.default = extendContextData;
//# sourceMappingURL=extendContextData.js.map