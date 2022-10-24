"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parseDirectory_1 = require("./parseDirectory");
async function getAllStories() {
    await parseDirectory_1.waitForIt;
    return parseDirectory_1.Components;
}
exports.default = getAllStories;
//# sourceMappingURL=getAllStories.js.map