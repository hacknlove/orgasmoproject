"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("../events");
async function getLabels(ctx) {
    if (ctx.req.labels) {
        return;
    }
    ctx.req.labels = [];
    if (!ctx.driver.labels?.getLabels) {
        return;
    }
    try {
        ctx.req.labels = (await ctx.driver.labels.getLabels(ctx)) ?? [];
    }
    catch (error) {
        events_1.default.emit("error", {
            type: "driver",
            method: "labels.getLabels",
            params: [ctx],
            error,
        });
    }
}
exports.default = getLabels;
//# sourceMappingURL=getLabels.js.map