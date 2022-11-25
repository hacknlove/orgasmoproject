"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
async function processRow({ rowConfig, params, ctx }) {
    const row = {
        type: rowConfig.type,
        props: rowConfig.props ?? {},
    };
    if (ctx.driver[rowConfig.getProps]) {
        row.props = {
            ...(await ctx.driver[rowConfig.getProps]({
                rowConfig,
                params,
                ctx,
            })),
            ...row.props,
        };
    }
    return row;
}
exports.default = processRow;
//# sourceMappingURL=processRow.js.map