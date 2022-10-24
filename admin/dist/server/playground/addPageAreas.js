"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cencode_1 = require("cencode");
function addPageAreas({ areas, ctx, pages }) {
    const pageConfig = pages[ctx.query.path]?.[ctx.query.pageId];
    if (!pageConfig) {
        return;
    }
    areas.mainArea_o = {
        items: [
            {
                type: "PageLayout_o",
            },
        ],
    };
    areas.pagePlaygroundRender_o = {
        items: [
            {
                type: "PagePlaygroundRender_o",
                props: {
                    pageConfig,
                    pathSample: pageConfig.exactPath ?? ctx.query.pathSample ?? "",
                    parsedPath: ctx.query.parsedPath
                        ? (0, cencode_1.decencode)(ctx.query.parsedPath)
                        : null,
                },
            },
        ],
    };
    areas.pagePlayground_o = {
        items: [
            {
                type: "PagePlayground_o",
                props: {
                    pageConfig,
                },
            },
        ],
    };
    areas.PlaygroundTitle_o = {
        items: [
            {
                type: "PlaygroundDeleteItem_o",
                props: {
                    label: "Delete Page",
                    action: `/api/_oadmin/page?pageId=${ctx.query.pageId}`,
                },
            },
        ],
    };
    const pathSamplesSet = new Set();
    for (const { pathSamples } of Object.values(pages[ctx.query.path])) {
        if (!pathSamples) {
            continue;
        }
        for (const pathSample of pathSamples) {
            pathSamplesSet.add(pathSample);
        }
    }
    const pathSamples = Array.from(pathSamplesSet);
    if (pathSamples.length) {
        areas.PlaygroundTitle_o.items.unshift({
            type: "PlaygroundSelectPathSample_o",
            props: {
                pathSamples,
                patternPath: pageConfig.patternPath,
            },
        });
    }
    return true;
}
exports.default = addPageAreas;
//# sourceMappingURL=addPageAreas.js.map