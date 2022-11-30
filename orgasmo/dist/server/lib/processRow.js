"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const skipThisRow_1 = require("./skipThisRow");
async function processRow({ rowConfig, params, ctx }) {
    if ((0, skipThisRow_1.default)({ rowConfig, ctx })) {
        return null;
    }
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