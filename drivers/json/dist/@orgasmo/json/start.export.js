"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parseDirectory_1 = require("../../admin/parseDirectory.");
const parseDirectory_2 = require("../../page/parseDirectory");
function start() {
    return Promise.all([(0, parseDirectory_1.default)(), (0, parseDirectory_2.default)()]);
}
exports.default = start;
//# sourceMappingURL=start.export.js.map