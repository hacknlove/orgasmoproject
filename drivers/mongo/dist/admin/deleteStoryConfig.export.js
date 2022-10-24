"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoProxy_1 = require("../mongoProxy");
const storyConfigsCollectionName = process.env.ORGASMO_MONGO_STORIES_COLLECTION ?? "storyConfigs";
async function deleteStoryConfig(ctx, { component, story }) {
    await mongoProxy_1.default.connect();
    await mongoProxy_1.default[storyConfigsCollectionName].deleteOne({
        component,
        story,
    });
}
exports.default = deleteStoryConfig;
//# sourceMappingURL=deleteStoryConfig.export.js.map