"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const expandPageConfig_1 = require("@orgasmo/orgasmo/expandPageConfig");
const events_1 = require("@orgasmo/orgasmo/events");
function wrapComponent(fileContent) {
    return {
        areas: {
            renderComponent: {
                items: [fileContent.itemConfig],
            },
        },
    };
}
async function expandPageConfigApi(ctx) {
    ctx.req.user = { roles: [] };
    const { pathParams, filePath } = ctx.req.body;
    let fileContent = ctx.req.body.fileContent;
    if (filePath.startsWith("/component/")) {
        fileContent = wrapComponent(fileContent);
    }
    let params = {
        params: { _o: pathParams?.path?.substr(1)?.split("/") ?? [] },
        parsedPath: pathParams?.params ?? {},
        path: pathParams?.path ?? "/",
    };
    if (fileContent.getParams) {
        try {
            params = (await ctx.driver[fileContent.getParams](ctx)) || params;
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
        pageConfig: fileContent,
        params,
        key: "",
    }));
}
exports.default = expandPageConfigApi;
//# sourceMappingURL=POST.export.js.map