"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const config_1 = require("@orgasmo/orgasmo/config");
const parseDirectory_1 = require("./parseDirectory");
const fs_extra_1 = require("fs-extra");
async function SavePageConfig(ctx, { component, story }) {
    await parseDirectory_1.waitForIt;
    const filePath = parseDirectory_1.storiesPaths[component]?.[story] ??
        (0, path_1.join)(process.cwd(), config_1.default["drivers.@orgasmo.json.storiesPath"], `${component}/${story}.json`);
    await (0, fs_extra_1.remove)(filePath);
    await (0, parseDirectory_1.default)(config_1.default["drivers.@orgasmo.json.storiesPath"]);
}
exports.default = SavePageConfig;
//# sourceMappingURL=deleteStoryConfig.export.js.map