"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const consts_1 = require("../consts");
const fs_extra_1 = require("fs-extra");
const parseDirectory_1 = require("../kvStorage/parseDirectory");
async function deleteKVStorage(ctx, key) {
    await parseDirectory_1.waitForIt;
    const filePath = parseDirectory_1.keysToFilePath[key] ?? (0, path_1.join)(process.cwd(), consts_1.kvStoragePath, `${key}.json`);
    await (0, fs_extra_1.remove)(filePath);
    await (0, parseDirectory_1.default)();
}
exports.default = deleteKVStorage;
//# sourceMappingURL=deleteKVStorage.export.js.map