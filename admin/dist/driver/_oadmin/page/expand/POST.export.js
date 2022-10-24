"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expandPageConfig_1 = require("@orgasmo/orgasmo/expandPageConfig");
const events_1 = require("@orgasmo/orgasmo/events");
async function expandPageConfigApi(ctx) {
    ctx.req.user = { roles: [] };
    const { pageConfig, resolvedUrl, parsedPath } = ctx.req.body;
    let params = {
        params: ctx.params,
        parsedPath: parsedPath ?? {},
        path: resolvedUrl.replace(/\?.*$/, ""),
    };
    if (pageConfig.getParams) {
        try {
            params = (await ctx.driver[pageConfig.getParams](ctx)) || params;
        }
        catch (error) {
            events_1.default.emit("error", {
                type: "driver",
                method: "page.getParams",
                params: [ctx],
                error,
            });
            return {
                notFound: true,
            };
        }
    }
    return ctx.res.json(await (0, expandPageConfig_1.default)({
        ctx,
        pageConfig,
        params,
        key: "",
    }));
}
exports.default = expandPageConfigApi;
//# sourceMappingURL=POST.export.js.map