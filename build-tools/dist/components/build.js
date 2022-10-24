"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const glob_1 = require("glob");
const config_1 = require("./config");
const path_1 = require("path");
const promises_1 = require("fs/promises");
const parseFiles_1 = require("../common/parseFiles");
const useImports_1 = require("./useImports");
async function build(path) {
    const files = (0, glob_1.sync)(config_1.globPath, {
        cwd: (0, path_1.resolve)(process.cwd(), path),
    });
    const imports = (0, parseFiles_1.default)(files, config_1.regexp);
    const string = `\
import dynamic from "next/dynamic";

export default {${(0, useImports_1.default)(imports)}
}
`;
    await (0, promises_1.writeFile)((0, path_1.join)(path, "Components.tsx"), string);
}
exports.default = build;
build(process.argv[2] ?? ".");
//# sourceMappingURL=build.js.map