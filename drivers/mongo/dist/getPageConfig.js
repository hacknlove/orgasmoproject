"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoProxy_1 = require("./mongoProxy");
const path_to_regexp_1 = require("path-to-regexp");
const pageConfigsCollectionName = process.env.ORGASMO_MONGO_PAGES_COLLECTION ?? "pageConfigs";
async function getPageConfig(ctx) {
    const resolvedPath = ctx.resolvedUrl.replace(/\?.*$/, "");
    await mongoProxy_1.default.connect();
    const exactMatch = await mongoProxy_1.default[pageConfigsCollectionName]
        .find({
        exactPath: resolvedPath,
    })
        .toArray();
    if (exactMatch.length) {
        ctx.parsedPath = {};
        return exactMatch.length > 1 ? exactMatch : exactMatch[0];
    }
    const regexps = await mongoProxy_1.default[pageConfigsCollectionName]
        .find({ patternPath: { $exists: 1 } })
        .toArray();
    regexps.sort((a, b) => {
        const lastA = a.patternPath
            .replace(/:[^/]+\(/g, "\uFFFE")
            .replace(/\(/g, "\uFFFF")
            .replace(/:[^/]*/, "\uFFFD");
        const lastB = b.patternPath
            .replace(/:[^/]+\(/g, "\uFFFE")
            .replace(/\(/g, "\uFFFF")
            .replace(/:[^/]*/, "\uFFFD");
        return lastA < lastB ? -1 : 1;
    });
    let matchedDynamicPath;
    const pageConfigs = [];
    for (const pageConfig of regexps) {
        if (matchedDynamicPath === pageConfig.patternPath) {
            pageConfigs.push(pageConfig);
            continue;
        }
        if (matchedDynamicPath) {
            break;
        }
        const matched = (0, path_to_regexp_1.match)(pageConfig.patternPath)(resolvedPath);
        if (matched) {
            ctx.parsedPath = matched.params;
            matchedDynamicPath = pageConfig.patternPath;
            pageConfigs.push(pageConfig);
        }
    }
    switch (pageConfigs.length) {
        case 0:
            return undefined;
        case 1:
            return pageConfigs[0];
        default:
            return pageConfigs;
    }
}
exports.default = getPageConfig;
//# sourceMappingURL=getPageConfig.js.map