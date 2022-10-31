"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parseDirectory_1 = require("../kvStorage/parseDirectory");
async function getAllKVStorages() {
    await parseDirectory_1.waitForIt;
    return Object.fromEntries(Object.entries(parseDirectory_1.kvStorage).map(([key, kvStorage]) => [
        key,
        kvStorage.description,
    ]));
}
exports.default = getAllKVStorages;
//# sourceMappingURL=getAllKVStorages.export.js.map