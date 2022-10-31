"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoProxy_1 = require("../mongoProxy");
const KVStorageCollectionName = process.env.ORGASMO_MONGO_KVSTORAGE_COLLECTION ?? "kvStorage";
async function getAllKVStorages() {
    await mongoProxy_1.default.connect();
    const storiesArray = await mongoProxy_1.default[KVStorageCollectionName].find({}, { projection: { _id: 0 } }).toArray();
    return Object.fromEntries(storiesArray.map(({ key, description }) => [key, description]));
}
exports.default = getAllKVStorages;
//# sourceMappingURL=getAllKVStorages.export.js.map