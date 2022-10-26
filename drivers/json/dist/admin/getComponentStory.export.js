"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parseDirectory_1 = require("./parseDirectory");
async function getComponentStory({ component, story }) {
    await parseDirectory_1.waitForIt;
    return parseDirectory_1.Components[component]?.[story];
}
exports.default = getComponentStory;
//# sourceMappingURL=getComponentStory.export.js.map