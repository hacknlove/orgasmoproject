"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const strapiFetch_1 = require("../strapiFetch");
async function updateStoryConfig(id, storyConfig) {
    await (0, strapiFetch_1.default)(`story-configs/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: { storyConfig } }),
    });
}
async function newStoryConfig(storyConfig) {
    await (0, strapiFetch_1.default)("story-configs", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ data: {
                filePath: `${storyConfig.itemConfig.type}/${storyConfig.story}`,
                storyConfig
            } }),
    });
}
async function upsertStoryConfig(ctx, storyConfig) {
    const exactMatch = await (0, strapiFetch_1.default)(`story-configs?filters[filePath][$eq]=${storyConfig.itemConfig.type}/${storyConfig.story}`);
    if (exactMatch?.data?.[0]?.id) {
        await updateStoryConfig(exactMatch.data[0].id, storyConfig);
    }
    else {
        await newStoryConfig(storyConfig);
    }
}
exports.default = upsertStoryConfig;
//# sourceMappingURL=saveStoryConfig.export.js.map