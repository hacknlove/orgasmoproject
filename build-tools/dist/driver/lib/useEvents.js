"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function useEvents(imports) {
    if (!imports) {
        return "";
    }
    let string = "";
    for (const { importName, name } of imports) {
        string = `${string}events.on("${name}", ${importName});\n`;
    }
    return string;
}
exports.default = useEvents;
//# sourceMappingURL=useEvents.js.map