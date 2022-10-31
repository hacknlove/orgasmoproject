"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function processRow({ rowConfig, params, ctx }) {
    const row = {
        type: rowConfig.type,
        props: rowConfig.props ?? {},
    };
    if (ctx.driver[rowConfig.getProps]) {
        row.props = {
            ...row.props,
            ...(await ctx.driver[rowConfig.getProps]({
                rowConfig,
                params,
                ctx,
            })),
        };
    }
    return row;
}
exports.default = processRow;
//# sourceMappingURL=processRow.js.map