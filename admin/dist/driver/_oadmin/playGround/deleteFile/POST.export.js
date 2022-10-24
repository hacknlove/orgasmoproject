"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cleanJson_1 = require("@orgasmo/orgasmo/cleanJson");
async function deleteFileApi(ctx) {
    const filePath = ctx.req.body.filePath;
    if (!filePath) {
        ctx.res.json({
            error: {
                title: "Wrong Parameters",
                text: "Missing filePath",
            },
        });
    }
    const type = filePath.match(/^\/(?<type>.*?)\//)?.groups?.type;
    let params;
    let method;
    switch (type) {
        case "content": {
            method = "admin.deleteStoryConfig";
            params = filePath.match(/^\/component\/(?<component>.+)\/(?<story>.+)$/).groups;
            break;
        }
        case "page": {
            method = "admin.deletePageConfig";
            params = filePath.match(/^\/page\/(?<pageId>.+)$/).groups;
        }
    }
    return ctx.res.json(await (0, cleanJson_1.cleanAwaitJson)(ctx.driver[method](ctx, params)));
}
exports.default = deleteFileApi;
//# sourceMappingURL=POST.export.js.map