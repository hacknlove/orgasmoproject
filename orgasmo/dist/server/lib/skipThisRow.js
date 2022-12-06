"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const matchCriteria_1 = require("./matchCriteria");
function skipThisRow({ rowConfig, ctx, }) {
    if (!(0, matchCriteria_1.default)({
        rules: rowConfig.roles,
        actualSet: new Set(ctx.req.user.roles),
    })) {
        return {};
    }
    if (!(0, matchCriteria_1.default)({
        rules: rowConfig.labels,
        actualSet: new Set(ctx.req.labels),
    })) {
        return {};
    }
}
exports.default = skipThisRow;
//# sourceMappingURL=skipThisRow.js.map