"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.decrypt = exports.encrypt = exports.parse = exports.serialize = exports.verifyit = exports.signit = void 0;
const cencode_1 = require("cencode");
const crypto_1 = require("crypto");
const logger_1 = require("../logger");
const secret = process.env.ORGASMO_SECRET ?? "orgamos_secret";
const util_1 = require("util");
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
const algorithm = "aes-192-cbc";
const keyLength = 24;
const scryptP = (0, util_1.promisify)(crypto_1.scrypt);
const randomBytesP = (0, util_1.promisify)(crypto_1.randomBytes);
async function encrypt(data, password) {
    const keyP = scryptP(password, secret, keyLength, {
        cost: 2,
    });
    const ivP = randomBytesP(16);
    const encodedData = (0, cencode_1.cencode)(data);
    const iv = await ivP;
    const key = await keyP;
    const cipher = (0, crypto_1.createCipheriv)(algorithm, await key, await iv);
    return Buffer.concat([
        iv,
        cipher.update(encodedData, "utf8"),
        cipher.final(),
    ]).toString("base64url");
}
exports.encrypt = encrypt;
function decrypt(base64url, key) {
    const buffer = Buffer.from(base64url, "base64url");
    const iv = buffer.subarray(0, keyLength);
    const ciphered = buffer.subarray(keyLength);
    const decipher = (0, crypto_1.createDecipheriv)(algorithm, key, iv);
    const cencoded = decipher.update(ciphered, "utf8") + decipher.final("utf8");
    return (0, cencode_1.decencode)(cencoded);
}
exports.decrypt = decrypt;
//# sourceMappingURL=serialization.js.map