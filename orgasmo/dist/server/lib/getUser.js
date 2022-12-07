"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("../events");
async function getUser(ctx) {
    if (ctx.req.user) {
        return;
    }
    ctx.req.user = {
        roles: [],
    };
    if (!ctx.driver.user?.getUser) {
        return;
    }
    try {
        Object.assign(ctx.req.user, await ctx.driver.user.getUser(ctx));
    }
    catch (error) {
        events_1.default.emit("error", {
            type: "driver",
            method: "user.getUser",
            params: [ctx],
            error,
        });
    }
}
exports.default = getUser;
//# sourceMappingURL=getUser.js.map