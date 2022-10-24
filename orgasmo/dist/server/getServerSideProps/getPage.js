"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getCachedPage_1 = require("./getCachedPage");
const getPageFromConfig_1 = require("./getPageFromConfig");
const getCachedPageVariant_1 = require("./getCachedPageVariant");
const events_1 = require("../events");
const sendFullPage_1 = require("./sendFullPage");
async function getPageConfig(ctx) {
    if (ctx.noCache) {
        return (0, getPageFromConfig_1.default)(ctx);
    }
    const { key, pageConfig } = await (0, getCachedPage_1.default)(ctx);
    if (!pageConfig) {
        return (0, getPageFromConfig_1.default)(ctx);
    }
    if (pageConfig.response) {
        return (0, sendFullPage_1.default)({ ctx, pageConfig });
    }
    if (pageConfig.pageIds) {
        return (0, getCachedPageVariant_1.default)({ pageIds: pageConfig.pageIds, ctx, key });
    }
    events_1.default.emit("error", {
        type: "internal",
        message: "Cached page is not full neither variant",
    });
    return {
        notFound: true,
    };
}
exports.default = getPageConfig;
//# sourceMappingURL=getPage.js.map