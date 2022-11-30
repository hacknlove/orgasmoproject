"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoProxy_1 = require("../../mongoProxy");
function default_1({ config }) {
    mongoProxy_1.default.connect((config.mongoURL = "mongodb://localhost:27017/orgasmo"));
}
exports.default = default_1;
//# sourceMappingURL=start.export.js.map