"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoProxy_1 = require("../mongoProxy");
const storyConfigsCollectionName = process.env.ORGASMO_MONGO_STORIES_COLLECTION ?? "storyConfigs";
async function getComponentStory({ component, story }) {
    await mongoProxy_1.default.connect();
    return mongoProxy_1.default[storyConfigsCollectionName].findOne({
        story,
        "itemConfig.type": component,
    });
}
exports.default = getComponentStory;
//# sourceMappingURL=getComponentStory.export.js.map