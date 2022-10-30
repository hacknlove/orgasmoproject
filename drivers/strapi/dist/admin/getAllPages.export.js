"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const strapiFetch_1 = require("../strapiFetch");
async function getAllPages() {
    const pages = {};
    let page = 1;
    while (true) {
        const pagesArray = await (0, strapiFetch_1.default)(`page-configs?pagination[page]=${page}`);
        for (const pageConfig of pagesArray.data) {
            const { exactPath, patternPath, pageId } = pageConfig.attributes;
            const path = exactPath ?? patternPath;
            pages[path] ?? (pages[path] = {});
            pages[path][pageId] = pageConfig.description ?? "";
        }
        if (page >= pagesArray.meta.pageCount) {
            break;
        }
        page++;
    }
    return pages;
}
exports.default = getAllPages;
//# sourceMappingURL=getAllPages.export.js.map