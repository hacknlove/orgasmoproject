"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pageConfigSchema = require("../../../../schemas/pageConfigSchema.json");
const logger_1 = require("@orgasmo/orgasmo/logger");
const configs = {
    page: {
        method: "admin.savePageConfig",
        schema: pageConfigSchema,
        hook: (content) => ({
            hook: "hook://admin.savePageConfig",
            body: {
                path: content.exactPath ?? content.patternPath,
                pageId: content.pageId,
            },
        }),
        getResponse: (content) => ({
            type: "page",
            filePath: `/page/${content.pageId}`,
            path: content.exactPath ?? content.patternPath,
            pageId: content.pageId,
            description: content.description ?? "",
        }),
    },
    component: {
        method: "admin.saveStoryConfig",
        schema: null,
        getResponse: (content) => ({
            type: "component",
            filePath: `/component/${content.itemConfig.type}/${content.story}`,
            component: content.itemConfig.type,
            story: content.story,
            description: content.description ?? "",
        }),
    },
    kvStorage: {
        method: "hook://admin.saveKVStorage",
        schema: null,
        hook: (content) => ({
            hook: "admin.saveKVStorage",
            body: {
                key: content.key,
            },
        }),
        getResponse: (content) => ({
            type: "kvStorage",
            filePath: `/value/${content.key}`,
            description: content.description ?? "",
        }),
    },
};
async function saveFileApi(ctx) {
    const content = ctx.req.body;
    let config;
    if (content.pageId) {
        config = configs.page;
    }
    else if (content.story) {
        config = configs.component;
    }
    else if (content.key) {
        config = configs.kvStorage;
    }
    else {
        ctx.res.json({
            error: {
                name: "Unknown file format",
                message: "The file is not a page, a story or a key-value storage entry",
            },
        });
    }
    if (!ctx.driver[config.method]) {
        ctx.res.json({
            error: {
                name: "Missing Method",
                message: `The driver have no ${config.method} method`,
            },
        });
        return;
    }
    try {
        await ctx.driver[config.method](ctx, content);
        ctx.res.json(config.getResponse(content));
    }
    catch (error) {
        logger_1.default.error(error, "Missing method");
        ctx.res.json({ error });
        return;
    }
    if (config.hook) {
        try {
            const hookConfig = config.hook(content);
            const hook = await ctx.driver.kvStorage.getValue(ctx, hookConfig.hook);
            if (!hook?.value) {
                return;
            }
            await fetch(hook.value.url, {
                ...hook.value.options,
                headers: {
                    "Content-Type": "application/json",
                    ...hook.value.options?.headers,
                },
                body: JSON.stringify(hookConfig.body),
            });
        }
        catch (error) {
            logger_1.default.error(error, "Missing method");
        }
    }
}
exports.default = saveFileApi;
//# sourceMappingURL=POST.export.js.map