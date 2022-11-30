"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoProxy_1 = require("../mongoProxy");
const storyConfigsCollectionName = process.env.ORGASMO_MONGO_STORIES_COLLECTION ?? "storyConfigs";
async function upsertStoryConfig(ctx, storyConfig) {
    await mongoProxy_1.default.waitfor;
    delete storyConfig._id;
    await mongoProxy_1.default[storyConfigsCollectionName].updateOne({
        "itemConfig.type": storyConfig.itemConfig.type,
        story: storyConfig.story,
    }, {
        $set: storyConfig,
    }, {
        upsert: true,
    });
    return { ok: true };
}
exports.default = upsertStoryConfig;
//# sourceMappingURL=saveStoryConfig.export.js.map