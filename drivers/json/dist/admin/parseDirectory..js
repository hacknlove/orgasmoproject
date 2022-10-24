"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitForIt = exports.Components = void 0;
const util_1 = require("util");
const glob_1 = require("glob");
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
const chokidar_1 = require("chokidar");
const glob = (0, util_1.promisify)(glob_1.glob);
exports.Components = {};
const dataPath = process.env.FILESYSTEM_DATA_PATH ?? "drivers/@orgasmo/json/data";
const storiesPath = `${dataPath}/stories`;
let resolve;
exports.waitForIt = new Promise((r) => (resolve = r));
async function parseDirectory() {
    for (const key in exports.Components) {
        delete exports.Components[key];
    }
    const files = await glob((0, path_1.join)(process.cwd(), storiesPath, "/**/*.json"));
    for (const storyPath of files) {
        const storyConfig = await (0, fs_extra_1.readJson)(storyPath, { throws: false });
        if (!storyConfig) {
            console.error(`Something wrong with ${storyPath}`);
            continue;
        }
        const component = storyConfig.itemConfig.type;
        const story = storyConfig.story;
        exports.Components[component] ?? (exports.Components[component] = {});
        exports.Components[component][story] = storyConfig;
    }
    resolve();
}
exports.default = parseDirectory;
if (process.env.NODE_ENV === "development") {
    const watcher = (0, chokidar_1.watch)(storiesPath, {
        ignoreInitial: true,
        awaitWriteFinish: true,
    });
    watcher.on("add", parseDirectory);
    watcher.on("unlink", parseDirectory);
    watcher.on("change", parseDirectory);
}
//# sourceMappingURL=parseDirectory..js.map