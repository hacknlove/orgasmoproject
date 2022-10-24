"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoProxy_1 = require("../mongoProxy");
const pageConfigsCollectionName = process.env.ORGASMO_MONGO_PAGES_COLLECTION ?? "pageConfigs";
async function getAllPages() {
    await mongoProxy_1.default.connect();
    const pagesArray = await mongoProxy_1.default[pageConfigsCollectionName]
        .find({}, { projection: { _id: 0 } })
        .toArray();
    const pages = {};
    for (const pageConfig of pagesArray) {
        const { exactPath, patternPath, pageId } = pageConfig;
        const path = exactPath ?? patternPath;
        pages[path] ?? (pages[path] = {});
        pages[path][pageId] = pageConfig.description ?? '';
    }
    return pages;
}
exports.default = getAllPages;
//# sourceMappingURL=getAllPages.export.js.map