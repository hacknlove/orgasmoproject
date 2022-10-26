"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parseDirectory_1 = require("../page/parseDirectory");
async function getAllPages() {
    await parseDirectory_1.waitForIt;
    const pagesArray = Array.from(parseDirectory_1.ids.values());
    const pages = {};
    for (const pageConfig of pagesArray) {
        const { exactPath, patternPath, pageId } = pageConfig;
        const path = exactPath ?? patternPath;
        pages[path] ?? (pages[path] = {});
        pages[path][pageId] = pageConfig.description ?? "";
    }
    return pages;
}
exports.default = getAllPages;
//# sourceMappingURL=getAllPages.export.js.map