"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globPath = exports.regexp = void 0;
exports.regexp = /^.\/node_modules\/.*|^\.\/style\.scss$|\.\/dist\/style\.css$|.*(module\.[^.]{3,4}$)|.*( copy\.[^.]{3,4}$)|(?<path>.*)/;
exports.globPath = "./**/*.{scss,sass,css}";
//# sourceMappingURL=config.js.map