"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const config_1 = require("@orgasmo/orgasmo/config");
const parseDirectory_1 = require("../page/parseDirectory");
const fs_extra_1 = require("fs-extra");
async function SavePageConfig(ctx, pageId) {
    await parseDirectory_1.waitForIt;
    const filePath = parseDirectory_1.idsToFilePath.get(pageId) ??
        (0, path_1.join)(process.cwd(), config_1.default["drivers.@orgasmo.json.pagePath"], `${pageId}.json`);
    await (0, fs_extra_1.remove)(filePath);
    await (0, parseDirectory_1.default)(config_1.default["drivers.@orgasmo.json.pagePath"]);
}
exports.default = SavePageConfig;
//# sourceMappingURL=deletePageConfig.export.js.map