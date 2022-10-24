"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cleanJson_1 = require("@orgasmo/orgasmo/cleanJson");
async function upsertStoryConfigApi(ctx) {
    if (!ctx.driver["admin.upsertStoryConfig"]) {
        ctx.res.json({
            error: {
                title: "method not available",
                text: 'The active driver has no "admin.upsertStoryConfig" method.',
            },
        });
    }
    const { storyConfig } = ctx.req.body;
    return ctx.res.json(await (0, cleanJson_1.cleanAwaitJson)(ctx.driver["admin.upsertStoryConfig"](ctx, storyConfig)));
}
exports.default = upsertStoryConfigApi;
//# sourceMappingURL=POST.export.js.map