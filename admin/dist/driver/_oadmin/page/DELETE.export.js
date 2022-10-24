"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cleanJson_1 = require("@orgasmo/orgasmo/cleanJson");
async function deletePageConfigApi(ctx) {
    if (!ctx.driver["admin.deletePageConfig"]) {
        ctx.res.json({
            error: {
                title: "method not available",
                text: 'The active driver has no "admin.deletePageConfig" method.',
            },
        });
    }
    const { storyConfig } = ctx.req.body;
    return ctx.res.json(await (0, cleanJson_1.cleanAwaitJson)(ctx.driver["admin.deletePageConfig"](ctx, storyConfig)));
}
exports.default = deletePageConfigApi;
//# sourceMappingURL=DELETE.export.js.map