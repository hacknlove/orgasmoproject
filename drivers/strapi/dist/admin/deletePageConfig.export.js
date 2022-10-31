"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const strapiFetch_1 = require("../strapiFetch");
async function deletePageConfig(ctx, pageId) {
    const exactMatch = await (0, strapiFetch_1.default)(`page-configs?filters[pageId][$eq]=${pageId}`);
    if (!exactMatch?.data?.[0]?.id) {
        throw new Error("page not found");
    }
    await (0, strapiFetch_1.default)(`page-configs/${exactMatch.data[0].id}`, {
        method: "DELETE",
    });
}
exports.default = deletePageConfig;
//# sourceMappingURL=deletePageConfig.export.js.map