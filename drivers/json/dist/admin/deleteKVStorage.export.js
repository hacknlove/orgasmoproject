"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const config_1 = require("@orgasmo/orgasmo/config");
const fs_extra_1 = require("fs-extra");
const parseDirectory_1 = require("../kvStorage/parseDirectory");
async function deleteKVStorage(ctx, key) {
    await parseDirectory_1.waitForIt;
    const filePath = parseDirectory_1.keysToFilePath[key] ??
        (0, path_1.join)(process.cwd(), config_1.default["drivers.@orgasmo.json.kvStoragePath"], `${key}.json`);
    await (0, fs_extra_1.remove)(filePath);
    await (0, parseDirectory_1.default)(config_1.default["drivers.@orgasmo.json.kvStoragePath"]);
}
exports.default = deleteKVStorage;
//# sourceMappingURL=deleteKVStorage.export.js.map