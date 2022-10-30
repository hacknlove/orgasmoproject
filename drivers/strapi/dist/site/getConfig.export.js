"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const strapiFetch_1 = require("../strapiFetch");
async function upsertStoryConfig() {
    const exactMatch = await (0, strapiFetch_1.default)(`site-configs?pagination[pageSize]=1`);
    return exactMatch?.data?.[0]?.attributes?.siteConfig ?? {};
}
exports.default = upsertStoryConfig;
//# sourceMappingURL=getConfig.export.js.map