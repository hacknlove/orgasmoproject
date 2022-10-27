"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const promises_1 = require("fs/promises");
const path_1 = require("path");
console.log(__dirname);
console.log((0, path_1.resolve)(__dirname, '../../../../style.css'));
const css = (0, promises_1.readFile)((0, path_1.resolve)(__dirname, '../../../../style.css'), { encoding: 'utf-8' });
function getCss(ctx) {
    ctx.res.send(css);
}
exports.default = getCss;
//# sourceMappingURL=GET.export.js.map