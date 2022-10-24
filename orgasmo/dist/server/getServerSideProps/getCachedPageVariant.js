"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chooseOne_1 = require("../lib/chooseOne");
const cencode_1 = require("cencode");
const cacheGet_1 = require("../cache/cacheGet");
const getPageFromConfig_1 = require("./getPageFromConfig");
const sendFullPage_1 = require("./sendFullPage");
const events_1 = require("../events");
async function getCachedPageVariant({ pageIds, ctx, key }) {
    const pageId = (0, chooseOne_1.default)({ array: pageIds, ctx });
    const newKey = (0, cencode_1.cencode)({ ...(0, cencode_1.decencode)(key), pageId });
    const pageConfig = await (0, cacheGet_1.default)({ ctx, key: newKey });
    if (!pageConfig) {
        return (0, getPageFromConfig_1.default)(ctx);
    }
    if (pageConfig.response) {
        return (0, sendFullPage_1.default)({ ctx, pageConfig });
    }
    events_1.default.emit("error", {
        type: "internal",
        message: "Cached variant is not full",
    });
    return {
        notFound: true,
    };
}
exports.default = getCachedPageVariant;
//# sourceMappingURL=getCachedPageVariant.js.map