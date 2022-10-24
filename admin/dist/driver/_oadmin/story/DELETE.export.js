"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cleanJson_1 = require("@orgasmo/orgasmo/cleanJson");
async function deleteStoryConfigApi(ctx) {
    if (!ctx.driver["admin.deleteStoryConfig"]) {
        ctx.res.json({
            error: {
                title: "method not available",
                text: 'The active driver has no "admin.deleteStoryConfig" method.',
            },
        });
    }
    return ctx.res.json(await (0, cleanJson_1.cleanAwaitJson)(ctx.driver["admin.deleteStoryConfig"](ctx, ctx.req.query)));
}
exports.default = deleteStoryConfigApi;
//# sourceMappingURL=DELETE.export.js.map