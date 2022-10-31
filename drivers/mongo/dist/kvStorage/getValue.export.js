"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoProxy_1 = require("../mongoProxy");
const siteCollectionName = process.env.ORGASMO_MONGO_SITE_COLLECTION ?? "kvStorage";
async function getConfig(ctx, key) {
    await mongoProxy_1.default.connect();
    return ((await mongoProxy_1.default[siteCollectionName].findOne({ key }, { projection: { _id: 0 } })) ?? {});
}
exports.default = getConfig;
//# sourceMappingURL=getValue.export.js.map