"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const strapiFetch_1 = require("../strapiFetch");
async function updatePageConfig(ctx, pageConfig) {
    const exactMatch = await (0, strapiFetch_1.default)(`page-configs?filters[pageId][$eq]=${pageConfig.pageId}`);
    const response = await (0, strapiFetch_1.default)(`page-configs/${exactMatch.data[0].id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: pageConfig }),
    }).catch((error) => ({ error }));
    return response;
}
exports.default = updatePageConfig;
//# sourceMappingURL=updatePageConfig.js.map