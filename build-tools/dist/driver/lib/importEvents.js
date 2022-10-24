"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function importEvents(imports) {
    if (!imports) {
        return "";
    }
    let string = "";
    for (const { importName, from } of imports) {
        string = `${string}\nimport ${importName} from "${from}";`;
    }
    return string;
}
exports.default = importEvents;
//# sourceMappingURL=importEvents.js.map