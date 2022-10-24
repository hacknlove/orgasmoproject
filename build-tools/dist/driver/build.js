"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const glob_1 = require("glob");
const config_1 = require("./config");
const path_1 = require("path");
const promises_1 = require("fs/promises");
const map_1 = require("./lib/map");
const parseFiles_1 = require("../common/parseFiles");
const byType_1 = require("./lib/byType");
const importEvents_1 = require("./lib/importEvents");
const importExport_1 = require("./lib/importExport");
const useExportsStrings_1 = require("./lib/useExportsStrings");
const useEvents_1 = require("./lib/useEvents");
const useExportsTree_1 = require("./lib/useExportsTree");
async function build(path) {
    const files = (0, glob_1.sync)(config_1.globPath, {
        cwd: (0, path_1.resolve)(process.cwd(), path),
    });
    const imports = (0, parseFiles_1.default)(files, config_1.regexp, map_1.default);
    const importsByType = (0, byType_1.default)(imports);
    const string = `\
${(0, importEvents_1.default)(importsByType.event)}\
${(0, importExport_1.default)(importsByType.export)}

${(0, useEvents_1.default)(importsByType.event)}

const driver = {${(0, useExportsStrings_1.default)(importsByType.export)}
}
${(0, useExportsTree_1.default)(importsByType.export)}

export default driver;
`;
    await (0, promises_1.writeFile)((0, path_1.join)(path, "driver.ts"), string);
}
exports.default = build;
build(process.argv[2] ?? ".");
//# sourceMappingURL=build.js.map