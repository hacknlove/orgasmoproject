"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("../events");
const Cache = new Map();
async function cacheFactory(ctx) {
    if (ctx.cache) {
        return;
    }
    if (!ctx.driver.cache?.factory) {
        ctx.cache = Cache;
        return;
    }
    try {
        ctx.cache = (await ctx.driver.cache?.factory?.()) ?? Cache;
        return;
    }
    catch (error) {
        events_1.default.emit("error", {
            type: "driver",
            driver: process.env.ORGASMO_DRIVER,
            method: "cache.factory",
            error,
        });
    }
    ctx.cache = Cache;
}
exports.default = cacheFactory;
//# sourceMappingURL=cacheFactory.js.map