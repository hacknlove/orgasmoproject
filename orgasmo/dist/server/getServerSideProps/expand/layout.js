"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cssvarize_1 = require("../../lib/cssvarize");
async function expandLayout({ ctx, layoutConfig, params }) {
    if (!layoutConfig) {
        return;
    }
    const expandedMeta = ctx.drivers[layoutConfig.getMeta]?.({
        ctx,
        params,
        meta: layoutConfig.meta,
    });
    const expandedCssVars = ctx.drivers[layoutConfig.getCssVars]?.({
        ctx,
        params,
    });
    return {
        name: layoutConfig.name,
        cssVars: (0, cssvarize_1.default)({
            ...layoutConfig.cssVars,
            ...(await expandedCssVars),
        }),
        meta: (await expandedMeta) ?? layoutConfig.meta ?? [],
    };
}
exports.default = expandLayout;
//# sourceMappingURL=layout.js.map