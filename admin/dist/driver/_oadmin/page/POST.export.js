"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cleanJson_1 = require("@orgasmo/orgasmo/cleanJson");
async function newPageConfigApi(ctx) {
    if (!ctx.driver["admin.newPageConfig"]) {
        ctx.res.json({
            error: {
                title: "method not available",
                text: 'The active driver has no "admin.newPageConfig" method.',
            },
        });
    }
    const { pageConfig } = ctx.req.body;
    return ctx.res.json(await (0, cleanJson_1.cleanAwaitJson)(ctx.driver["admin.newPageConfig"](ctx, pageConfig)));
}
exports.default = newPageConfigApi;
//# sourceMappingURL=POST.export.js.map