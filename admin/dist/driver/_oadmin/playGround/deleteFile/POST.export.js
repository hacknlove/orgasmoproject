"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configs = {
    site: {
        method: "admin.deleteSiteConfig",
        getParams: () => [],
        getResponse: () => ({}),
    },
    component: {
        method: "admin.deleteStoryConfig",
        getParams: (splitedPath) => [
            {
                component: splitedPath[2],
                story: splitedPath[3],
            },
        ],
        getResponse: (splitedPath) => ({
            type: "component",
            component: splitedPath[2],
            story: splitedPath[3],
        }),
    },
    page: {
        method: "admin.deletePageConfig",
        getParams: (splitedPath) => [splitedPath[2]],
        getResponse: (splitedPath) => ({
            type: "page",
            pageId: splitedPath[2],
        }),
    },
};
async function deleteFileApi(ctx) {
    const filePath = ctx.req.body.filePath;
    if (!filePath) {
        ctx.res.json({
            error: {
                title: "Wrong Parameters",
                text: "Missing filePath",
            },
        });
    }
    const splitedPath = ctx.req.body.filePath.split("/");
    const config = configs[splitedPath[1]];
    if (!ctx.driver[config.method]) {
        return ctx.res.json({
            error: {
                name: "Missing Method",
                message: `The driver has no ${config.method} method`,
            },
        });
    }
    const isDeleted = await ctx.driver[config.method](ctx, ...config.getParams(splitedPath));
    if (!isDeleted) {
        return ctx.res.json({
            error: {
                name: "Error",
                message: `File ${filePath} could not be deleted`,
            },
        });
    }
    return ctx.res.json(config.getResponse(splitedPath));
}
exports.default = deleteFileApi;
//# sourceMappingURL=POST.export.js.map