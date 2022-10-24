"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function importExports(imports) {
    if (!imports) {
        return "";
    }
    let string = "";
    for (const { importName, from } of imports) {
        string = `${string}\nimport ${importName} from "${from}";`;
    }
    return string;
}
exports.default = importExports;
//# sourceMappingURL=importExport.js.map