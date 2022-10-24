"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const nookies_1 = require("nookies");
function setCookies({ ctx, cookies = [] }) {
    ctx.setCookies.forEach(({ name, value, options }) => nookies_1.default.set(ctx, name, value, options));
    cookies.forEach(({ name, value, options }) => nookies_1.default.set(ctx, name, value, options));
}
exports.default = setCookies;
//# sourceMappingURL=setCookies.js.map