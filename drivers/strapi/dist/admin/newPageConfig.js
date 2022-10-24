"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const strapiFetch_1 = require("../strapiFetch");
async function newPageConfig(ctx, pageConfig) {
    const response = await (0, strapiFetch_1.default)("page-configs", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: pageConfig }),
    }).catch((error) => ({ error }));
    return response;
}
exports.default = newPageConfig;
//# sourceMappingURL=newPageConfig.js.map