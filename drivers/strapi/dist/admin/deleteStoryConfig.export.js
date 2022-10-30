"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const strapiFetch_1 = require("../strapiFetch");
async function deleteStoryConfig(ctx, { component, story }) {
    const exactMatch = await (0, strapiFetch_1.default)(`story-configs?filters[filePath][$eq]=${component}/${story}`);
    if (!exactMatch?.data?.[0]?.id) {
        throw new Error('page not found');
    }
    await (0, strapiFetch_1.default)(`story-configs/${exactMatch.data[0].id}`, {
        method: 'DELETE'
    });
}
exports.default = deleteStoryConfig;
//# sourceMappingURL=deleteStoryConfig.export.js.map