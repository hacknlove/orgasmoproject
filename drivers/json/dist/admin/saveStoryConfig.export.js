"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
const consts_1 = require("../consts");
const parseDirectory_1 = require("./parseDirectory");
async function SavePageConfig(ctx, storyConfig) {
    const component = storyConfig.itemConfig.type;
    const story = storyConfig.story;
    const filePath = parseDirectory_1.storiesPaths[component][story] ??
        (0, path_1.join)(process.cwd(), consts_1.storiesPath, `${component}/${story}.json`);
    await (0, fs_extra_1.writeJson)(filePath, storyConfig, { spaces: 2 });
    await (0, parseDirectory_1.default)();
}
exports.default = SavePageConfig;
//# sourceMappingURL=saveStoryConfig.export.js.map