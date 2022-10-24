"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parseDirectory_1 = require("./parseDirectory");
async function getPageConfig(ctx) {
    await parseDirectory_1.waitForIt;
    const resolvedPath = ctx.resolvedUrl.replace(/\?.*$/, "");
    const exactMatch = parseDirectory_1.staticPaths.get(resolvedPath);
    if (exactMatch) {
        ctx.parsedPath = {};
        return exactMatch;
    }
    for (const [, { match, pageConfig }] of parseDirectory_1.dynamicPaths) {
        const matched = match(resolvedPath);
        if (matched) {
            ctx.parsedPath = matched.params;
            return pageConfig;
        }
    }
}
exports.default = getPageConfig;
//# sourceMappingURL=getPageConfig.export.js.map