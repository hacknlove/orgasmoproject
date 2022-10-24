"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const getItem_1 = require("./getItem");
const getMore_1 = require("./getMore");
const apiCall_1 = require("./apiCall");
const events_1 = require("../events");
function apiFactory({ driver, }) {
    return async (req, res) => {
        const ctx = {
            driver,
            req,
            res,
            events: events_1.default,
        };
        switch (req.query?._o?.[0]) {
            case "_ogr":
                return (0, getItem_1.default)(ctx);
            case "_ogm":
                return (0, getMore_1.default)(ctx);
            default:
                return (0, apiCall_1.default)(ctx);
        }
    };
}
exports.default = apiFactory;
//# sourceMappingURL=factory.js.map