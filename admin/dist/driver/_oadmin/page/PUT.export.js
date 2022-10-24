"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cleanJson_1 = require("@orgasmo/orgasmo/cleanJson");
async function upsertPageConfigApi(ctx) {
    if (!ctx.driver["admin.upsertPageConfig"]) {
        ctx.res.json({
            error: {
                title: "method not available",
                text: 'The active driver has no "admin.upsertPageConfig" method.',
            },
        });
    }
    const { pageConfig } = ctx.req.body;
    return ctx.res.json(await (0, cleanJson_1.cleanAwaitJson)(ctx.driver["admin.upsertPageConfig"](ctx, pageConfig)));
}
exports.default = upsertPageConfigApi;
//# sourceMappingURL=PUT.export.js.map