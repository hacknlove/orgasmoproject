"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const strapiFetch_1 = require("../strapiFetch");
async function getComponentStory({ component, story }) {
    const exactMatch = await (0, strapiFetch_1.default)(`story-configs?filters[filePath][$eq]=${component}/${story}`);
    return exactMatch?.data?.[0]?.attributes?.storyConfig;
}
exports.default = getComponentStory;
//# sourceMappingURL=getComponentStory.export.js.map