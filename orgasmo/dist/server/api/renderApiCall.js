"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pageConfig_1 = require("../getServerSideProps/expand/pageConfig");
const events_1 = require("../events");
async function renderApiCall(ctx) {
    if (ctx.req.method !== "POST") {
        return ctx.res.json(null);
    }
    ctx.req.user = { roles: [] };
    const { pageConfig, resolvedUrl } = ctx.req.body;
    let params = {
        params: ctx.params,
        parsedPath: ctx.parsedPath,
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
    return ctx.res.json(await (0, pageConfig_1.default)({
        ctx,
        pageConfig,
        params,
        key: "",
    }));
}
exports.default = renderApiCall;
//# sourceMappingURL=renderApiCall.js.map