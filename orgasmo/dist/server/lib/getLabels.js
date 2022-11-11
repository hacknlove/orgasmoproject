"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const logger_1 = require("../logger");
async function getLabels(ctx) {
    if (ctx.req.labels) {
        return;
    }
    ctx.req.labels = [];
    if (!ctx.driver.labels?.getLabels) {
        return;
    }
    try {
        ctx.req.labels = (await ctx.driver.labels.getLabels(ctx)) || [];
    }
    catch (error) {
        logger_1.default.error({ error, ctx }, "Error calling labels.getLabels");
    }
}
exports.default = getLabels;
//# sourceMappingURL=getLabels.js.map