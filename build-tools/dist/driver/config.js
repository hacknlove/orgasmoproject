"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.globPath = exports.regexp = void 0;
exports.regexp = /^(?<from>\.\/(?<route>[^.]*)\/(?<filename>[^/.]+)\.(?<type>export|event))\.ts$/;
exports.globPath = "./**/*.{export,event}.{js,ts,mjs,cjs}";
//# sourceMappingURL=config.js.map