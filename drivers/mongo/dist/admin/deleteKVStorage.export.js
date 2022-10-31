"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoProxy_1 = require("../mongoProxy");
const KVStorageCollectionName = process.env.ORGASMO_MONGO_KVSTORAGE_COLLECTION ?? "kvStorage";
async function deleteKVStorage() {
    await mongoProxy_1.default.connect();
    await mongoProxy_1.default[KVStorageCollectionName].deleteOne({});
}
exports.default = deleteKVStorage;
//# sourceMappingURL=deleteKVStorage.export.js.map