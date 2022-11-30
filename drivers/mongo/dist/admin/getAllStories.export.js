"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoProxy_1 = require("../mongoProxy");
const storyConfigsCollectionName = process.env.ORGASMO_MONGO_STORIES_COLLECTION ?? "storyConfigs";
async function getAllStories() {
    await mongoProxy_1.default.waitfor;
    const storiesArray = await mongoProxy_1.default[storyConfigsCollectionName]
        .find({}, { projection: { _id: 0 } })
        .toArray();
    const stories = {};
    for (const storyConfig of storiesArray) {
        const component = storyConfig.itemConfig.type;
        const story = storyConfig.story;
        stories[component] ?? (stories[component] = {});
        stories[component][story] = storyConfig.description ?? "";
    }
    return stories;
}
exports.default = getAllStories;
//# sourceMappingURL=getAllStories.export.js.map