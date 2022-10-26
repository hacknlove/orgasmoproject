"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitForIt = exports.idsToFilePath = exports.ids = exports.staticPaths = exports.dynamicPaths = void 0;
const util_1 = require("util");
const glob_1 = require("glob");
const path_to_regexp_1 = require("path-to-regexp");
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
const Ajv = require("ajv");
const chokidar_1 = require("chokidar");
const consts_1 = require("../consts");
const pageConfigSchema = require("../schemas/pageConfigSchema.json");
const glob = (0, util_1.promisify)(glob_1.glob);
const ajv = new Ajv();
const validate = ajv.compile(pageConfigSchema);
exports.dynamicPaths = new Map();
exports.staticPaths = new Map();
exports.ids = new Map();
exports.idsToFilePath = new Map();
let resolve;
exports.waitForIt = new Promise((r) => (resolve = r));
async function parseDirectory() {
    const tempStaticPaths = new Map();
    const tempDynamicPaths = new Map();
    const oldIds = new Set(exports.ids.keys());
    const files = await glob((0, path_1.join)(process.cwd(), consts_1.pagesPath, "/**/*.json"));
    for (const filePath of files) {
        const pageConfig = await (0, fs_extra_1.readJson)(filePath, { throws: false });
        if (!pageConfig) {
            console.error(`Something wrong with ${filePath}`);
            continue;
        }
        const valid = validate(pageConfig);
        if (!valid) {
            console.error(`${filePath}:\n${JSON.stringify(validate.errors, null, 4)}`);
            continue;
        }
        if (exports.ids.has(pageConfig.pageId) && !oldIds.has(pageConfig.pageId)) {
            console.error(`There is already a pageConfig with the pageId "${pageConfig.pageId}"`);
        }
        exports.idsToFilePath.set(pageConfig.pageId, filePath);
        exports.ids.set(pageConfig.pageId, pageConfig);
        oldIds.delete(pageConfig.pageId);
        let bucket;
        let path;
        if (pageConfig.exactPath) {
            bucket = tempStaticPaths;
            path = pageConfig.exactPath;
        }
        else {
            bucket = tempDynamicPaths;
            path = pageConfig.patternPath;
        }
        exports.ids.set(pageConfig.pageId, pageConfig);
        oldIds.delete(pageConfig.pageId);
        const current = bucket.get(path);
        if (!current) {
            bucket.set(path, pageConfig);
            continue;
        }
        if (Array.isArray(current)) {
            current.push(pageConfig);
            continue;
        }
        bucket.set(path, [current, pageConfig]);
    }
    const sortedDynamicPaths = Array.from(tempDynamicPaths.keys());
    sortedDynamicPaths.sort((a, b) => {
        const lastA = a
            .replace(/:[^/]+\(/g, "\uFFFE")
            .replace(/\(/g, "\uFFFF")
            .replace(/:[^/]*/, "\uFFFD");
        const lastB = b
            .replace(/:[^/]+\(/g, "\uFFFE")
            .replace(/\(/g, "\uFFFF")
            .replace(/:[^/]*/, "\uFFFD");
        return lastA < lastB ? -1 : 1;
    });
    exports.dynamicPaths.clear();
    for (const path of sortedDynamicPaths) {
        exports.dynamicPaths.set(path, {
            match: (0, path_to_regexp_1.match)(path),
            pageConfig: tempDynamicPaths.get(path),
        });
    }
    exports.staticPaths.clear();
    for (const [path, config] of tempStaticPaths) {
        exports.staticPaths.set(path, config);
    }
    for (const oldId of oldIds) {
        exports.ids.delete(oldId);
        exports.idsToFilePath.delete(oldId);
    }
    resolve();
}
exports.default = parseDirectory;
if (process.env.NODE_ENV === "development") {
    const watcher = (0, chokidar_1.watch)(consts_1.pagesPath, {
        ignoreInitial: true,
        awaitWriteFinish: true,
    });
    watcher.on("add", parseDirectory);
    watcher.on("unlink", parseDirectory);
    watcher.on("change", parseDirectory);
}
//# sourceMappingURL=parseDirectory.js.map