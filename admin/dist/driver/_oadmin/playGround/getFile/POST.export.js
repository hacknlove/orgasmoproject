"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const configs = {
    site: {
        method: "site.getConfig",
        getParams: () => [],
    },
    component: {
        method: "admin.getComponentStory",
        getParams: (splitedPath) => [
            {
                component: splitedPath[2],
                story: splitedPath[3],
            },
        ],
        getDefault: (splitedPath) => ({
            component: splitedPath[2],
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
        getParams: (splitedPath) => [splitedPath[2]],
    },
};
async function getFile(ctx) {
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
    const content = (await ctx.driver[config.method](...config.getParams(splitedPath))) ??
        config.getDefault(splitedPath);
    ctx.res.json(content);
}
exports.default = getFile;
//# sourceMappingURL=POST.export.js.map