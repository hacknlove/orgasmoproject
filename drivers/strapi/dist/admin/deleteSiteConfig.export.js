"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const strapiFetch_1 = require("../strapiFetch");
async function deleteStoryConfig() {
    const exactMatch = await (0, strapiFetch_1.default)(`site-configs?pagination[pageSize]=1`);
    if (!exactMatch?.data?.[0]?.id) {
        throw new Error('page not found');
    }
    await (0, strapiFetch_1.default)(`site-configs/${exactMatch.data[0].id}`, {
        method: 'DELETE'
    });
}
exports.default = deleteStoryConfig;
//# sourceMappingURL=deleteSiteConfig.export.js.map