"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const strapiFetch_1 = require("../strapiFetch");
async function updateSiteConfig(id, siteConfig) {
    await (0, strapiFetch_1.default)(`site-configs/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: { siteConfig } }),
    });
}
async function newSiteConfig(siteConfig) {
    await (0, strapiFetch_1.default)("site-configs", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: { siteConfig } }),
    });
}
async function upsertStoryConfig(ctx, siteConfig) {
    const exactMatch = await (0, strapiFetch_1.default)(`site-configs?pagination[pageSize]=1`);
    if (exactMatch?.data?.[0]?.id) {
        await updateSiteConfig(exactMatch.data[0].id, siteConfig);
    }
    else {
        await newSiteConfig(siteConfig);
    }
}
exports.default = upsertStoryConfig;
//# sourceMappingURL=saveSiteConfig.export.js.map