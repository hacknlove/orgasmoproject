"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cencode_1 = require("cencode");
const cleanJson_1 = require("../../lib/cleanJson");
const timechunks_1 = require("../../lib/timechunks");
const rewrite_1 = require("./rewrite");
const layout_1 = require("./layout");
const areas_1 = require("./areas");
async function expandPageConfig({ ctx, pageConfig, key, params = undefined, }) {
    if (pageConfig.getFlowControl) {
        params = params || (0, cencode_1.decencode)(key);
        pageConfig.flowControl = {
            ...pageConfig.flowControl,
            ...(await ctx.drivers[pageConfig.getFlowControl]?.({ ctx, params })),
        };
    }
    if (pageConfig.flowControl?.redirect) {
        return {
            redirect: pageConfig.flowControl.redirect,
        };
    }
    if (pageConfig.flowControl?.rewrite) {
        return (0, rewrite_1.default)({ ctx, rewrite: pageConfig.flowControl.rewrite, key });
    }
    const timeChunk = (0, timechunks_1.currentTimeChunk)(pageConfig.cache);
    params = params || (0, cencode_1.decencode)(key);
    return (0, cleanJson_1.cleanAwaitJson)({
        props: {
            layout: (0, layout_1.default)({ ctx, params, layoutConfig: pageConfig.layout }),
            areas: (0, areas_1.default)({
                ctx,
                pageId: pageConfig.pageId,
                areasConfig: pageConfig.areas,
                params,
                timeChunk,
            }),
        },
    });
}
exports.default = expandPageConfig;
//# sourceMappingURL=pageConfig.js.map