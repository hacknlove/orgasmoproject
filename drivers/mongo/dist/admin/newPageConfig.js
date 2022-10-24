"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoProxy_1 = require("../mongoProxy");
const pageConfigsCollectionName = process.env.ORGASMO_MONGO_PAGES_COLLECTION ?? "pageConfigs";
async function newPageConfig(ctx, pageConfig) {
    await mongoProxy_1.default.connect();
    delete pageConfig._id;
    await mongoProxy_1.default[pageConfigsCollectionName].insertOne(pageConfig);
    return { ok: true };
}
exports.default = newPageConfig;
//# sourceMappingURL=newPageConfig.js.map