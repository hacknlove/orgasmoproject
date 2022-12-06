"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
const parseDirectory_1 = require("../kvStorage/parseDirectory");
const config_1 = require("@orgasmo/orgasmo/config");
const kvStoragePath = config_1.default['drivers.@orgasmo.json'];
async function getConfig(ctx, kvStorage) {
    await parseDirectory_1.waitForIt;
    const filePath = parseDirectory_1.keysToFilePath[kvStorage.key] ??
        (0, path_1.join)(process.cwd(), kvStoragePath, `/${kvStorage.key}.json`);
    await (0, fs_extra_1.outputJson)(filePath, kvStorage, { spaces: 2 });
    await (0, parseDirectory_1.default)(ctx.drivers['@orgasmo'].json.kvStoragePathPath);
}
exports.default = getConfig;
//# sourceMappingURL=setValue.export.js.map