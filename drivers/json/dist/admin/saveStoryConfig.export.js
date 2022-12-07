"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
const parseDirectory_1 = require("./parseDirectory");
const config_1 = require("@orgasmo/orgasmo/config");
async function SavePageConfig(ctx, storyConfig) {
    await parseDirectory_1.waitForIt;
    const component = storyConfig.itemConfig.type;
    const story = storyConfig.story;
    const filePath = parseDirectory_1.storiesPaths[component]?.[story] ??
        (0, path_1.join)(process.cwd(), config_1.default["driver.@orgasmo.json.storiesPath"], `${component}/${story}.json`);
    await (0, fs_extra_1.outputJson)(filePath, storyConfig, { spaces: 2 });
    await (0, parseDirectory_1.default)(config_1.default["driver.@orgasmo.json.storiesPath"]);
}
exports.default = SavePageConfig;
//# sourceMappingURL=saveStoryConfig.export.js.map