"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoProxy_1 = require("../mongoProxy");
const kvStorageCollectionName = process.env.ORGASMO_MONGO_SITE_COLLECTION ?? "kvStorage";
async function getConfig(ctx, key, value) {
    await mongoProxy_1.default.connect();
    await mongoProxy_1.default[kvStorageCollectionName].updateOne({ key }, {
        $set: value,
    }, {
        upsert: true,
    });
}
exports.default = getConfig;
//# sourceMappingURL=setValue.export.js.map