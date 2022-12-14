"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.watchValues = exports.waitForIt = exports.keysToFilePath = exports.kvStorage = void 0;
const util_1 = require("util");
const glob_1 = require("glob");
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
const logger_1 = require("@orgasmo/orgasmo/logger");
const chokidar_1 = require("chokidar");
const glob = (0, util_1.promisify)(glob_1.glob);
exports.kvStorage = {};
exports.keysToFilePath = {};
let resolve;
exports.waitForIt = new Promise((r) => (resolve = r));
async function parseDirectory(kvStoragePath) {
    for (const key in exports.kvStorage) {
        delete exports.kvStorage[key];
        delete exports.keysToFilePath[key];
    }
    const files = await glob((0, path_1.join)(process.cwd(), kvStoragePath, "/**/*.json"));
    for (const keyPath of files) {
        const kvStorage = await (0, fs_extra_1.readJson)(keyPath, { throws: false });
        if (!kvStorage) {
            logger_1.default.error({ keyPath }, `Error reading %s`, kvStoragePath);
            continue;
        }
        kvStorage[kvStorage.key] = kvStorage.value;
        exports.keysToFilePath[kvStorage.key] = keyPath;
    }
    resolve();
}
exports.default = parseDirectory;
function watchValues(kvStoragePath) {
    const watcher = (0, chokidar_1.watch)(kvStoragePath, {
        ignoreInitial: true,
        awaitWriteFinish: true,
    });
    watcher.on("add", () => parseDirectory(kvStoragePath));
    watcher.on("unlink", () => parseDirectory(kvStoragePath));
    watcher.on("change", () => parseDirectory(kvStoragePath));
}
exports.watchValues = watchValues;
//# sourceMappingURL=parseDirectory.js.map