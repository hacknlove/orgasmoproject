"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getUser_1 = require("../lib/getUser");
async function apiCall(ctx) {
    const { driver, req, res } = ctx;
    const handler = `${req.query._o.join(".")}.${req.method}`;
    if (!driver[handler]) {
        return res.json({
            error: "not found",
        });
    }
    await (0, getUser_1.default)(ctx);
    return driver[handler](ctx);
}
exports.default = apiCall;
//# sourceMappingURL=apiCall.js.map