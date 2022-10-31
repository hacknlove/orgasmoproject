"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function getKVStorageList({ driver }) {
    return (await driver?.admin?.getAllKVStorages?.()?.catch(() => ({}))) || {};
}
exports.default = getKVStorageList;
//# sourceMappingURL=getKVStorageList.js.map