"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoProxy_1 = require("../mongoProxy");
const siteCollectionName = process.env.ORGASMO_MONGO_SITE_COLLECTION ?? "site";
async function upsertStoryConfig(ctx, siteConfig) {
    await mongoProxy_1.default.connect();
    delete siteConfig._id;
    await mongoProxy_1.default[siteCollectionName].updateOne({}, {
        $set: siteConfig,
    }, {
        upsert: true,
    });
    return { ok: true };
}
exports.default = upsertStoryConfig;
//# sourceMappingURL=saveSiteConfig.export.js.map