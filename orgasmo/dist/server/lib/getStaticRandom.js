"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nookies_1 = require("nookies");
function getStaticRandom(ctx) {
    if (ctx.req.user.staticRandom !== undefined) {
        return ctx.req.user.staticRandom;
    }
    const cookies = nookies_1.default.get(ctx);
    if (cookies.o_sr) {
        return parseFloat(cookies.o_sr);
    }
    const random = Math.random() * 0.9999;
    nookies_1.default.set(ctx, "o_sr", random.toString(), {
        maxAge: 60 * 60 * 24 * 365,
        path: "/",
        httpOnly: true,
    });
    if (ctx.req.user) {
        ctx.req.user.staticRandom = random;
    }
    return random;
}
exports.default = getStaticRandom;
//# sourceMappingURL=getStaticRandom.js.map