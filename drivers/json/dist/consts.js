"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.kvStoragePath = exports.storiesPath = exports.sitePath = exports.pagesPath = void 0;
const dataPath = process.env.FILESYSTEM_DATA_PATH ?? "drivers/@orgasmo/json/data";
exports.pagesPath = `${dataPath}/pages`;
exports.sitePath = `${dataPath}/site.json`;
exports.storiesPath = `${dataPath}/stories`;
exports.kvStoragePath = `${dataPath}/values`;
//# sourceMappingURL=consts.js.map