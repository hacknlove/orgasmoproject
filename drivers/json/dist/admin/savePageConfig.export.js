"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
const consts_1 = require("../consts");
const parseDirectory_1 = require("../page/parseDirectory");
async function SavePageConfig(ctx, pageConfig) {
    const filePath = parseDirectory_1.idsToFilePath.get(pageConfig.pageId) ??
        (0, path_1.join)(process.cwd(), consts_1.pagesPath, `${pageConfig.pageId}.json`);
    await (0, fs_extra_1.writeJson)(filePath, pageConfig);
    await (0, parseDirectory_1.default)();
}
exports.default = SavePageConfig;
//# sourceMappingURL=savePageConfig.export.js.map