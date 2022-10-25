"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parseDirectory_1 = require("./parseDirectory.");
async function getAllStories() {
    await parseDirectory_1.waitForIt;
    return Object.fromEntries(Object.entries(parseDirectory_1.Components).map(([key, component]) => [
        key,
        Object.fromEntries(Object.entries(component).map(([story, storyConfig]) => [story, storyConfig.description])),
    ]));
}
exports.default = getAllStories;
//# sourceMappingURL=getAllStories.export.js.map