"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function byType(files) {
    var _a;
    const response = {};
    for (const file of files) {
        response[_a = file.type] ?? (response[_a] = []);
        response[file.type].push(file);
    }
    return response;
}
exports.default = byType;
//# sourceMappingURL=byType.js.map