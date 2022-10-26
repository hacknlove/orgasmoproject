"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const consts_1 = require("../consts");
const parseDirectory_1 = require("../page/parseDirectory");
const fs_extra_1 = require("fs-extra");
async function SavePageConfig(ctx, pageId) {
    const filePath = parseDirectory_1.idsToFilePath.get(pageId) ??
        (0, path_1.join)(process.cwd(), consts_1.pagesPath, `${pageId}.json`);
    await (0, fs_extra_1.remove)(filePath);
    await (0, parseDirectory_1.default)();
}
exports.default = SavePageConfig;
//# sourceMappingURL=deletePageConfig.export.js.map