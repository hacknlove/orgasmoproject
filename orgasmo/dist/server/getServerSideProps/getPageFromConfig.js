"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cencode_1 = require("cencode");
const pageConfig_1 = require("./expand/pageConfig");
const events_1 = require("../events");
const chooseOne_1 = require("../lib/chooseOne");
const cacheNewItem_1 = require("../cache/cacheNewItem");
const sendFullPage_1 = require("./sendFullPage");
async function getPageFromConfig(ctx) {
    let pageConfig;
    try {
        pageConfig = await ctx.driver.page.getPageConfig(ctx);
    }
    catch (error) {
        events_1.default.emit("error", {
            type: "driver",
            method: "page.getPageConfig",
            params: [ctx],
            error,
        });
    }
    if (!pageConfig) {
        return {
            notFound: true,
        };
    }
    const pageIds = Array.isArray(pageConfig) && pageConfig.map((page) => page.pageId);
    if (pageIds) {
        pageConfig = (0, chooseOne_1.default)({ array: pageConfig, ctx });
    }
    let params = {
        params: ctx.params,
        parsedPath: ctx.parsedPath,
        path: ctx.resolvedUrl.replace(/\?.*$/, ""),
        roles: ctx.req.user.roles,
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
    if (pageIds && !ctx.noCache) {
        await (0, cacheNewItem_1.default)({
            ctx,
            key: (0, cencode_1.cencode)(params),
            item: {
                timeChunk: pageConfig.timeChunk,
                revalidate: pageConfig.revalidate,
                autoRefresh: pageConfig.autoRefresh,
                pageIds,
            },
        });
        params.pageId = pageConfig.pageId;
    }
    const key = (0, cencode_1.cencode)(params);
    const response = pageConfig.response || (await (0, pageConfig_1.default)({ ctx, pageConfig, params, key }));
    pageConfig = {
        timeChunk: pageConfig.timeChunk,
        revalidate: pageConfig.revalidate,
        autoRefresh: pageConfig.autoRefresh,
        response,
    };
    if (pageIds) {
        pageConfig.private = true;
    }
    if (!ctx.noCache && pageConfig.timeChunk && !pageConfig.private) {
        await (0, cacheNewItem_1.default)({
            ctx,
            key: (0, cencode_1.cencode)(params),
            item: pageConfig,
        });
    }
    return (0, sendFullPage_1.default)({
        ctx,
        pageConfig,
    });
}
exports.default = getPageFromConfig;
//# sourceMappingURL=getPageFromConfig.js.map