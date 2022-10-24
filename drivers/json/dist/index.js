"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parseDirectory_1 = require("./page/parseDirectory");
const parseDirectory_2 = require("./admin/parseDirectory.");
const chokidar_1 = require("chokidar");
const promises_1 = require("fs/promises");
const notPossible_1 = require("./admin/notPossible");
const dataPath = process.env.FILESYSTEM_DATA_PATH ?? "drivers/@orgasmo/json/data";
const pagesPath = `${dataPath}/pages`;
const storiesPath = `${dataPath}/stories`;
(0, parseDirectory_1.default)();
(0, parseDirectory_2.default)();
const getPageConfig_export_1 = require("./page/getPageConfig.export");
const getPageConfigFromId_export_1 = require("./page/getPageConfigFromId.export");
const getAllStories_export_1 = require("./admin/getAllStories.export");
const filesystemDriver = {
    page: {
        getPageConfig: getPageConfig_export_1.default,
        getPageConfigFromId: getPageConfigFromId_export_1.default,
    },
    admin: {
        updatePageConfig: notPossible_1.default,
        newPageConfig: notPossible_1.default,
        upsertStoryConfig: notPossible_1.default,
        newStoryConfig: notPossible_1.default,
        deletePageConfig: notPossible_1.default,
        deleteStoryConfig: notPossible_1.default,
        getAllStories: getAllStories_export_1.default,
    },
    "page.getPageConfig": getPageConfig_export_1.default,
    "page.getPageConfigFromId": getPageConfigFromId_export_1.default,
    "admin.updatePageConfig": notPossible_1.default,
    "admin.newPageConfig": notPossible_1.default,
    "admin.upsertStoryConfig": notPossible_1.default,
    "admin.newStoryConfig": notPossible_1.default,
    "admin.getAllStories": getAllStories_export_1.default,
    "admin.deletePageConfig": notPossible_1.default,
    "admin.deleteStoryConfig": notPossible_1.default,
};
exports.default = filesystemDriver;
async function reparse() {
    await Promise.all([
        (0, parseDirectory_1.default)(pagesPath),
        (0, parseDirectory_2.default)(storiesPath),
    ]);
    const componentFile = await (0, promises_1.readFile)("./Components.jsx", {
        encoding: "utf-8",
    }).catch(() => "");
    if (!componentFile) {
        return;
    }
    await (0, promises_1.writeFile)("./Components.jsx", componentFile.replace(/^\/\/ Refreshed at .*/gm, "") +
        `// Refreshed at ${new Date().toISOString()}`);
}
if (process.env.NODE_ENV === "development") {
    const watcher = (0, chokidar_1.watch)(pagesPath, {
        ignoreInitial: true,
        awaitWriteFinish: true,
    });
    watcher.on("add", reparse);
    watcher.on("unlink", reparse);
    watcher.on("change", reparse);
}
//# sourceMappingURL=index.js.map