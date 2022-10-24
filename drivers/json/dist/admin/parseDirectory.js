"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.waitForIt = exports.Components = void 0;
const util_1 = require("util");
const glob_1 = require("glob");
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
const glob = (0, util_1.promisify)(glob_1.glob);
exports.Components = {};
let resolve;
exports.waitForIt = new Promise((r) => (resolve = r));
async function parseDirectory(pathToJsonDirectory) {
    for (const key in exports.Components) {
        delete exports.Components[key];
    }
    const files = await glob((0, path_1.join)(process.cwd(), pathToJsonDirectory, "/**/*.json"));
    for (const storyPath of files) {
        const storyConfig = await (0, fs_extra_1.readJson)(storyPath, { throws: false });
        if (!storyConfig) {
            console.error(`Something wrong with ${storyPath}`);
            continue;
        }
        const { component, story, ...config } = storyConfig;
        exports.Components[component] ?? (exports.Components[component] = {});
        exports.Components[component][story] = config;
    }
    resolve();
}
exports.default = parseDirectory;
//# sourceMappingURL=parseDirectory.js.map