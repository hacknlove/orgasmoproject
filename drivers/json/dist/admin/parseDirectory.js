"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.watchStories = exports.waitForIt = exports.storiesPaths = exports.Components = void 0;
const util_1 = require("util");
const glob_1 = require("glob");
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
const chokidar_1 = require("chokidar");
const logger_1 = require("@orgasmo/orgasmo/logger");
const glob = (0, util_1.promisify)(glob_1.glob);
exports.Components = {};
exports.storiesPaths = {};
let resolve;
exports.waitForIt = new Promise((r) => (resolve = r));
async function parseDirectory(storiesPath) {
    for (const key in exports.Components) {
        delete exports.Components[key];
        delete exports.storiesPaths[key];
    }
    const files = await glob((0, path_1.join)(process.cwd(), storiesPath, "/**/*.json"));
    for (const storyPath of files) {
        const storyConfig = await (0, fs_extra_1.readJson)(storyPath, { throws: false });
        if (!storyConfig) {
            logger_1.default.error({ storyPath }, `Error reading %s`, storiesPath);
            continue;
        }
        const component = storyConfig.itemConfig.type;
        const story = storyConfig.story;
        exports.Components[component] ?? (exports.Components[component] = {});
        exports.Components[component][story] = storyConfig;
        exports.storiesPaths[component] ?? (exports.storiesPaths[component] = {});
        exports.storiesPaths[component][story] = storyPath;
    }
    resolve();
}
exports.default = parseDirectory;
function watchStories(storiesPath) {
    const watcher = (0, chokidar_1.watch)(storiesPath, {
        ignoreInitial: true,
        awaitWriteFinish: true,
    });
    watcher.on("add", () => parseDirectory(storiesPath));
    watcher.on("unlink", () => parseDirectory(storiesPath));
    watcher.on("change", () => parseDirectory(storiesPath));
}
exports.watchStories = watchStories;
//# sourceMappingURL=parseDirectory.js.map