"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
const consts_1 = require("../consts");
const path_1 = require("path");
const parseDirectory_1 = require("../kvStorage/parseDirectory");
async function getConfig(ctx, kvStorage) {
    await parseDirectory_1.waitForIt;
    const filePath = parseDirectory_1.keysToFilePath[kvStorage.key] ??
        (0, path_1.join)(process.cwd(), consts_1.kvStoragePath, `/${kvStorage.key}.json`);
    await (0, fs_extra_1.outputJson)(filePath, kvStorage, { spaces: 2 });
    await (0, parseDirectory_1.default)();
}
exports.default = getConfig;
//# sourceMappingURL=setValue.export.js.map