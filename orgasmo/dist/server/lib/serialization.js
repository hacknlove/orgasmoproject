"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parse = exports.serialize = exports.verifyit = exports.signit = void 0;
const cencode_1 = require("cencode");
const crypto_1 = require("crypto");
const logger_1 = require("../logger");
const secret = process.env.ORGASMO_SECRET;
function signit(string) {
    return (0, crypto_1.createHash)("md5").update(`${string}${secret}`).digest("hex");
}
exports.signit = signit;
function verifyit(signature, string) {
    return signit(string) === signature;
}
exports.verifyit = verifyit;
function serialize(data) {
    return (0, cencode_1.sign)(data, signit);
}
exports.serialize = serialize;
function parse(data) {
    try {
        return (0, cencode_1.verify)(data, verifyit);
    }
    catch (e) {
        logger_1.default.error(e, "Error parsing string");
        return { error: "Signature is invalid" };
    }
}
exports.parse = parse;
//# sourceMappingURL=serialization.js.map