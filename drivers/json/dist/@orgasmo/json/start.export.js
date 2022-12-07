"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parseDirectory_1 = require("../../admin/parseDirectory");
const parseDirectory_2 = require("../../page/parseDirectory");
const parseDirectory_3 = require("../../kvStorage/parseDirectory");
const config_1 = require("@orgasmo/orgasmo/config");
function start() {
    if (process.env.NODE_ENV === "development") {
        (0, parseDirectory_2.watchPages)(config_1.default.driver["@orgasmo"].json.pagesPath);
        (0, parseDirectory_1.watchStories)(config_1.default.driver["@orgasmo"].json.storiesPath);
        (0, parseDirectory_3.watchValues)(config_1.default.driver["@orgasmo"].json.kvStoragePath);
    }
    return Promise.all([
        (0, parseDirectory_1.default)(config_1.default.driver["@orgasmo"].json.storiesPath),
        (0, parseDirectory_2.default)(config_1.default.driver["@orgasmo"].json.pagesPath),
        (0, parseDirectory_3.default)(config_1.default.driver["@orgasmo"].json.kvStoragePath),
    ]);
}
exports.default = start;
//# sourceMappingURL=start.export.js.map