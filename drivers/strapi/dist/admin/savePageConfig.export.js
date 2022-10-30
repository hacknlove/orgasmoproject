"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const strapiFetch_1 = require("../strapiFetch");
async function updatePageConfig(id, pageConfig) {
    await (0, strapiFetch_1.default)(`page-configs/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: pageConfig }),
    });
}
async function newPageConfig(pageConfig) {
    await (0, strapiFetch_1.default)("page-configs", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: pageConfig }),
    });
}
async function SavePageConfig(ctx, pageConfig) {
    const exactMatch = await (0, strapiFetch_1.default)(`page-configs?filters[pageId][$eq]=${pageConfig.pageId}`);
    if (exactMatch?.data?.[0]?.id) {
        await updatePageConfig(exactMatch.data[0].id, pageConfig);
    }
    else {
        await newPageConfig(pageConfig);
    }
}
exports.default = SavePageConfig;
//# sourceMappingURL=savePageConfig.export.js.map