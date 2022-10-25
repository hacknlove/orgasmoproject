"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const POST_export_1 = require("./_oadmin/playGround/deleteFile/POST.export");
const POST_export_2 = require("./_oadmin/playGround/expand/POST.export");
const POST_export_3 = require("./_oadmin/playGround/getFile/POST.export");
const POST_export_4 = require("./_oadmin/playGround/saveFile/POST.export");
const driver = {
    ["_oadmin.playGround.deleteFile.POST"]: POST_export_1.default,
    ["_oadmin.playGround.expand.POST"]: POST_export_2.default,
    ["_oadmin.playGround.getFile.POST"]: POST_export_3.default,
    ["_oadmin.playGround.saveFile.POST"]: POST_export_4.default,
};
driver["_oadmin"] = {};
driver["_oadmin"]["playGround"] = {};
driver["_oadmin"]["playGround"]["deleteFile"] = {};
driver["_oadmin"]["playGround"]["deleteFile"]["POST"] = POST_export_1.default;
driver["_oadmin"]["playGround"]["expand"] = {};
driver["_oadmin"]["playGround"]["expand"]["POST"] = POST_export_2.default;
driver["_oadmin"]["playGround"]["getFile"] = {};
driver["_oadmin"]["playGround"]["getFile"]["POST"] = POST_export_3.default;
driver["_oadmin"]["playGround"]["saveFile"] = {};
driver["_oadmin"]["playGround"]["saveFile"]["POST"] = POST_export_4.default;
exports.default = driver;
//# sourceMappingURL=driver.js.map