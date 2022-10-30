"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const strapiFetch_1 = require("../strapiFetch");
async function getAllStories() {
    const stories = {};
    let page = 1;
    while (true) {
        const storiesArray = await (0, strapiFetch_1.default)(`story-configs?pagination[page]=${page}`);
        for (const storyConfig of storiesArray.data) {
            const component = storyConfig.attributes.itemConfig.type;
            const story = storyConfig.attributes.story;
            stories[component] ?? (stories[component] = {});
            stories[component][story] = storyConfig.attributes.description ?? "";
        }
        if (page >= storiesArray.meta.pageCount) {
            break;
        }
        page++;
    }
    return stories;
}
exports.default = getAllStories;
//# sourceMappingURL=getAllStories.export.js.map