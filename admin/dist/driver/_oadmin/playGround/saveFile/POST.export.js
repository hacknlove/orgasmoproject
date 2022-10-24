"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pageConfigSchema = require("../../../../schemas/pageConfigSchema.json");
const configs = {
    page: {
        method: "admin.savePageConfig",
        schema: pageConfigSchema,
        getFilePath: (content) => `/page/${content.pageId}`,
    },
    component: {
        method: "admin.saveStoryConfig",
        schema: null,
        getFilePath: (content) => `/component/${content.itemConfig.type}/${content.story}`,
    },
    site: {
        method: "admin.saveSiteConfig",
        schema: null,
        getFilePath: () => `/site/config`,
    },
};
async function deleteFileApi(ctx) {
    const content = ctx.req.body;
    let config;
    if (content.pageId) {
        config = configs.page;
    }
    else if (content.story) {
        config = configs.component;
    }
    else {
        config = configs.site;
    }
    if (!ctx.driver[config.method]) {
        return ctx.res.json({
            error: {
                name: "Missing Method",
                message: `The driver has no ${config.method} method`,
            },
        });
    }
    try {
        await ctx.driver[config.method](ctx, content);
        ctx.res.json({ filePath: config.getFilePath(content) });
    }
    catch (error) {
        ctx.res.json({ error });
    }
}
exports.default = deleteFileApi;
//# sourceMappingURL=POST.export.js.map