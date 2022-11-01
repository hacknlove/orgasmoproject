"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getLabels(ctx) {
    const token = ctx.query?.mockLabels ??
        ctx.req.query?.mockLabels ??
        ctx.cookies?.mockLabels ??
        ctx.req.headers.mockLabels;
    if (!token) {
        return;
    }
    return {
        labels: token.split(","),
    };
}
const driver = {
    user: {
        getLabels,
    },
    "user.getLabels": getLabels,
};
exports.default = driver;
//# sourceMappingURL=mockLabels.js.map