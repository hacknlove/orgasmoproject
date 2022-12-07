"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
const config_1 = require("@orgasmo/orgasmo/config");
const parseDirectory_1 = require("../page/parseDirectory");
async function SavePageConfig(ctx, pageConfig) {
    await parseDirectory_1.waitForIt;
    const filePath = parseDirectory_1.idsToFilePath.get(pageConfig.pageId) ??
        (0, path_1.join)(process.cwd(), config_1.default["driver.@orgasmo.json.pagesPath"], `${pageConfig.pageId}.json`);
    await (0, fs_extra_1.outputJson)(filePath, pageConfig, { spaces: 2 });
    await (0, parseDirectory_1.default)(ctx.driver["@orgasmo"].json.pagesPath);
}
exports.default = SavePageConfig;
//# sourceMappingURL=savePageConfig.export.js.map