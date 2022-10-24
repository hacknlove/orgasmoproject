"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoProxy_1 = require("../mongoProxy");
const storyConfigsCollectionName = process.env.ORGASMO_MONGO_STORIES_COLLECTION ?? "storyConfigs";
async function upsertStoryConfig(ctx, { component, story, ...$set }) {
    await mongoProxy_1.default.connect();
    await mongoProxy_1.default[storyConfigsCollectionName].updateOne({
        component,
        story,
    }, {
        $set,
    }, {
        upsert: true,
    });
    return { ok: true };
}
exports.default = upsertStoryConfig;
//# sourceMappingURL=upsertStoryConfig.js.map