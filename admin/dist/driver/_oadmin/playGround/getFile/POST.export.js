"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configs = {
    value: {
        method: "kvStorage.getValue",
        getParams: (ctx, splitedPath) => [ctx, splitedPath[2]],
    },
    component: {
        method: "admin.getComponentStory",
        getParams: (ctx, splitedPath) => [
            {
                component: splitedPath[2],
                story: splitedPath[3],
            },
        ],
        getDefault: (splitedPath) => ({
            story: splitedPath[3],
            description: "Create a new story",
            itemConfig: {
                type: splitedPath[2],
                props: {},
            },
        }),
    },
    page: {
        method: "page.getPageConfigFromId",
        getParams: (ctx, splitedPath) => [splitedPath[2]],
    },
};
async function getFile(ctx) {
    const splitedPath = ctx.req.body.filePath.split("/");
    const config = configs[splitedPath[1]];
    if (!ctx.drivers[config.method]) {
        return ctx.res.json({
            error: {
                name: "Missing Method",
                message: `The driver has no ${config.method} method`,
            },
        });
    }
    const content = (await ctx.drivers[config.method](...config.getParams(ctx, splitedPath))) ??
        config.getDefault?.(splitedPath) ?? {
        error: `${ctx.req.body.filePath} not found`,
    };
    ctx.res.json(content);
}
exports.default = getFile;
//# sourceMappingURL=POST.export.js.map