"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getUser(ctx) {
    const token = ctx.query?.mockToken ??
        ctx.req.query?.mockToken ??
        ctx.cookies?.mockToken ??
        ctx.req.headers.mockToken;
    if (!token) {
        return;
    }
    return {
        roles: token.split(","),
    };
}
const driver = {
    user: {
        getUser,
    },
    "user.getUser": getUser,
};
exports.default = driver;
//# sourceMappingURL=mockRoles.js.map