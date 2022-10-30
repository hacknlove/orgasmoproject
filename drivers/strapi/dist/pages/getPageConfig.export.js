"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const strapiFetch_1 = require("../strapiFetch");
const path_to_regexp_1 = require("path-to-regexp");
const mapStrapiToOrgasmo_1 = require("../mapStrapiToOrgasmo");
async function getPageConfig(ctx) {
    const resolvedPath = ctx.resolvedUrl.replace(/\?.*$/, "");
    const exactMatch = await (0, strapiFetch_1.default)(`page-configs?filters[exactPath][$eq]=${resolvedPath}`);
    if (exactMatch.error) {
        ctx.events.emit("error", {
            type: "driver",
            driver: process.env.ORGASMO_DRIVER,
            method: "page.getPageConfig",
            error: exactMatch.error,
        });
        return null;
    }
    ctx.parsedPath = {};
    switch (exactMatch.data.length) {
        case 0:
            break;
        case 1:
            return (0, mapStrapiToOrgasmo_1.default)(exactMatch.data[0]);
        default:
            return exactMatch.data.map(mapStrapiToOrgasmo_1.default);
    }
    const dynamicPages = await (0, strapiFetch_1.default)(`page-configs?filters[patternPath][$notNull]=true&pagination[pageSize]=100`);
    if (dynamicPages.error) {
        ctx.events.emit("error", {
            type: "driver",
            driver: process.env.ORGASMO_DRIVER,
            method: "page.getPageConfig",
            error: dynamicPages.error,
        });
        return null;
    }
    dynamicPages.data.sort((a, b) => {
        const lastA = a.attributes.patternPath
            .replace(/:[^/]+\(/g, "\uFFFE")
            .replace(/\(/g, "\uFFFF")
            .replace(/:[^/]*/, "\uFFFD");
        const lastB = b.attributes.patternPath
            .replace(/:[^/]+\(/g, "\uFFFE")
            .replace(/\(/g, "\uFFFF")
            .replace(/:[^/]*/, "\uFFFD");
        return lastA < lastB ? -1 : 1;
    });
    let matchedDynamicPath;
    const pageConfigs = [];
    for (const pageConfig of dynamicPages.data) {
        if (matchedDynamicPath === pageConfig.attributes.patternPath) {
            pageConfigs.push(pageConfig);
            continue;
        }
        if (matchedDynamicPath) {
            break;
        }
        const matched = (0, path_to_regexp_1.match)(pageConfig.attributes.patternPath)(resolvedPath);
        if (matched) {
            ctx.parsedPath = matched.params;
            matchedDynamicPath = pageConfig.attributes.patternPath;
            pageConfigs.push(pageConfig);
        }
    }
    switch (pageConfigs.length) {
        case 0:
            return undefined;
        case 1:
            return (0, mapStrapiToOrgasmo_1.default)(pageConfigs[0]);
        default:
            return pageConfigs.map(mapStrapiToOrgasmo_1.default);
    }
}
exports.default = getPageConfig;
//# sourceMappingURL=getPageConfig.export.js.map