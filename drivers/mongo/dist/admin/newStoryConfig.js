"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoProxy_1 = require("../mongoProxy");
const storyConfigsCollectionName = process.env.ORGASMO_MONGO_STORIESS_COLLECTION ?? "storyConfigs";
async function newStoryConfig(ctx, { _id, ...storyConfig }) {
    await mongoProxy_1.default.connect();
    await mongoProxy_1.default[storyConfigsCollectionName].insertOne(storyConfig);
    return { ok: true };
}
exports.default = newStoryConfig;
//# sourceMappingURL=newStoryConfig.js.map