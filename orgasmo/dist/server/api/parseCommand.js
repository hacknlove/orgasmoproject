"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = require("../events");
const getUser_1 = require("../lib/getUser");
const serialization_1 = require("../lib/serialization");
async function parseCommand({ req, res, driver }) {
    const command = (0, serialization_1.parse)(req.query.c);
    if (command.error === "Signature is invalid") {
        events_1.default.emit("badSigned", { req, command });
        res.json({
            error: "bad signed",
        });
        return;
    }
    const { roles, expire } = command;
    if (expire < Date.now()) {
        events_1.default.emit("expiredSignature", { req, command });
        return res.json({
            error: "expired signature",
        });
    }
    await (0, getUser_1.default)({ driver, req });
    const user = req.user;
    if (user.roles === roles) {
        return command;
    }
    if (user.roles.length !== roles.length) {
        events_1.default.emit("wrongUser", { req, command });
        return res.json({
            error: "wrong user",
        });
    }
    for (let i = 0; i < roles.length; i++) {
        if (user.roles[i] !== roles[i]) {
            events_1.default.emit("wrongUser", { req, command });
            return res.json({
                error: "wrong user",
            });
        }
    }
    return command;
}
exports.default = parseCommand;
//# sourceMappingURL=parseCommand.js.map