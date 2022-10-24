"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("../events");
async function getUser(ctx) {
    if (ctx.req.user) {
        return;
    }
    if (!ctx.driver.user?.getUser) {
        ctx.req.user = {
            roles: [],
        };
        return;
    }
    try {
        ctx.req.user = (await ctx.driver.user.getUser(ctx)) ?? {
            roles: [],
        };
    }
    catch (error) {
        events_1.default.emit("error", {
            type: "driver",
            method: "user.getUser",
            params: [ctx],
            error,
        });
        ctx.req.user = {
            roles: [],
        };
    }
    if (!ctx.req.user.roles) {
        ctx.req.user.roles = [];
    }
}
exports.default = getUser;
//# sourceMappingURL=getUser.js.map