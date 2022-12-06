"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cencode_1 = require("cencode");
const pageConfig_1 = require("./expand/pageConfig");
const events_1 = require("../events");
const chooseOne_1 = require("../lib/chooseOne");
const cacheNewItem_1 = require("../cache/cacheNewItem");
const sendFullPage_1 = require("./sendFullPage");
const filterCriteria_1 = require("../lib/filterCriteria");
const logger_1 = require("../logger");
async function getPageFromConfig(ctx) {
    let pageConfig;
    try {
        pageConfig = await ctx.drivers.page.getPageConfig(ctx);
    }
    catch (error) {
        logger_1.default.error({
            error,
            ctx,
        }, "Driver error at page.getPageConfig");
    }
    if (!pageConfig || pageConfig.length === 0) {
        return {
            notFound: true,
        };
    }
    if (!Array.isArray(pageConfig)) {
        pageConfig = [pageConfig];
    }
    pageConfig = (0, filterCriteria_1.default)(pageConfig, "roles", ctx.req.user.roles);
    pageConfig = (0, filterCriteria_1.default)(pageConfig, "labels", ctx.req.labels);
    if (!pageConfig || pageConfig.length === 0) {
        return {
            notFound: true,
        };
    }
    const pageIds = pageConfig.map((page) => page.pageId);
    pageConfig = pageConfig[1]
        ? (0, chooseOne_1.default)({ array: pageConfig, ctx })
        : pageConfig[0];
    let params = {
        params: ctx.params,
        parsedPath: ctx.parsedPath,
        path: ctx.resolvedUrl.replace(/\?.*$/, ""),
        roles: ctx.req.user.roles,
        labels: ctx.req.labels,
    };
    if (pageConfig.getParams) {
        try {
            params = (await ctx.drivers[pageConfig.getParams](ctx)) || params;
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
    const page = {
        timeChunk: pageConfig.timeChunk,
        revalidate: pageConfig.revalidate,
        autoRefresh: pageConfig.autoRefresh,
        private: pageConfig.private || pageIds.length > 1,
        response: pageConfig.response ||
            (await (0, pageConfig_1.default)({ ctx, pageConfig, params, key })),
    };
    if (!ctx.noCache && pageConfig.timeChunk && !pageConfig.private) {
        await (0, cacheNewItem_1.default)({
            ctx,
            key,
            item: page,
        });
    }
    return (0, sendFullPage_1.default)({
        ctx,
        pageConfig: page,
    });
}
exports.default = getPageFromConfig;
//# sourceMappingURL=getPageFromConfig.js.map