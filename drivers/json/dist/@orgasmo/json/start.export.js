"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parseDirectory_1 = require("../../admin/parseDirectory");
const parseDirectory_2 = require("../../page/parseDirectory");
const parseDirectory_3 = require("../../kvStorage/parseDirectory");
function start({ config }) {
    if (process.env.NODE_ENV === "development") {
        (0, parseDirectory_2.watchPages)(config.pagesPath);
        (0, parseDirectory_1.watchStories)(config.storiesPath);
        (0, parseDirectory_3.watchValues)(config.kvStoragePath);
    }
    return Promise.all([
        (0, parseDirectory_1.default)(config.storiesPath),
        (0, parseDirectory_2.default)(config.pagesPath),
        (0, parseDirectory_3.default)(config.kvStoragePath),
    ]);
}
exports.default = start;
//# sourceMappingURL=start.export.js.map