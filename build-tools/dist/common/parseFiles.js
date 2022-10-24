"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function parseFiles(files, regex, map) {
    const imports = [];
    for (const path of files) {
        const match = regex.exec(path);
        if (!match) {
            continue;
        }
        imports.push(map ? map(match.groups) : match.groups);
    }
    return imports;
}
exports.default = parseFiles;
//# sourceMappingURL=parseFiles.js.map