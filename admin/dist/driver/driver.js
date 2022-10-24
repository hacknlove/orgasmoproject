"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const DELETE_export_1 = require("./_oadmin/page/DELETE.export");
const POST_export_1 = require("./_oadmin/page/expand/POST.export");
const POST_export_2 = require("./_oadmin/page/POST.export");
const PUT_export_1 = require("./_oadmin/page/PUT.export");
const POST_export_3 = require("./_oadmin/playGround/deleteFile/POST.export");
const POST_export_4 = require("./_oadmin/playGround/expand/POST.export");
const POST_export_5 = require("./_oadmin/playGround/getFile/POST.export");
const POST_export_6 = require("./_oadmin/playGround/saveFile/POST.export");
const DELETE_export_2 = require("./_oadmin/story/DELETE.export");
const POST_export_7 = require("./_oadmin/story/POST.export");
const driver = {
    ["_oadmin.page.DELETE"]: DELETE_export_1.default,
    ["_oadmin.page.expand.POST"]: POST_export_1.default,
    ["_oadmin.page.POST"]: POST_export_2.default,
    ["_oadmin.page.PUT"]: PUT_export_1.default,
    ["_oadmin.playGround.deleteFile.POST"]: POST_export_3.default,
    ["_oadmin.playGround.expand.POST"]: POST_export_4.default,
    ["_oadmin.playGround.getFile.POST"]: POST_export_5.default,
    ["_oadmin.playGround.saveFile.POST"]: POST_export_6.default,
    ["_oadmin.story.DELETE"]: DELETE_export_2.default,
    ["_oadmin.story.POST"]: POST_export_7.default,
};
driver["_oadmin"] = {};
driver["_oadmin"]["page"] = {};
driver["_oadmin"]["page"]["DELETE"] = DELETE_export_1.default;
driver["_oadmin"]["page"]["expand"] = {};
driver["_oadmin"]["page"]["expand"]["POST"] = POST_export_1.default;
driver["_oadmin"]["page"]["POST"] = POST_export_2.default;
driver["_oadmin"]["page"]["PUT"] = PUT_export_1.default;
driver["_oadmin"]["playGround"] = {};
driver["_oadmin"]["playGround"]["deleteFile"] = {};
driver["_oadmin"]["playGround"]["deleteFile"]["POST"] = POST_export_3.default;
driver["_oadmin"]["playGround"]["expand"] = {};
driver["_oadmin"]["playGround"]["expand"]["POST"] = POST_export_4.default;
driver["_oadmin"]["playGround"]["getFile"] = {};
driver["_oadmin"]["playGround"]["getFile"]["POST"] = POST_export_5.default;
driver["_oadmin"]["playGround"]["saveFile"] = {};
driver["_oadmin"]["playGround"]["saveFile"]["POST"] = POST_export_6.default;
driver["_oadmin"]["story"] = {};
driver["_oadmin"]["story"]["DELETE"] = DELETE_export_2.default;
driver["_oadmin"]["story"]["POST"] = POST_export_7.default;
exports.default = driver;
//# sourceMappingURL=driver.js.map