"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const glob_1 = require("glob");
const config_1 = require("./config");
const path_1 = require("path");
const promises_1 = require("fs/promises");
const parseFiles_1 = require("../common/parseFiles");
async function build(path, output) {
    const cwd = (0, path_1.resolve)(process.cwd(), path);
    const files = (0, glob_1.sync)(config_1.globPath, {
        cwd,
    });
    const imports = (0, parseFiles_1.default)(files, config_1.regexp);
    let string = "";
    for (const { path } of imports) {
        if (!path) {
            continue;
        }
        string = `\
${string}
/* start file: ${path} */
${await (0, promises_1.readFile)((0, path_1.join)(cwd, path))}
/* end file: ${path} */

`;
    }
    await (0, promises_1.writeFile)(output || (0, path_1.join)(path, "style.scss"), string);
}
exports.default = build;
build(process.argv[2] ?? ".", process.argv[3]);
//# sourceMappingURL=build.js.map