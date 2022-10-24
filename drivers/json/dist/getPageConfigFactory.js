"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parseDirectory_1 = require("./parseDirectory");
async function getPageConfig(ctx) {
  const resolvedPath = ctx.resolvedUrl.replace(/\?.*$/, "");
  for (const [path, { match, pageConfig }] of parseDirectory_1.paths) {
    if (path === resolvedPath) {
      ctx.parsedPath = {};
      return pageConfig;
    }
    const matched = match(resolvedPath);
    if (matched) {
      ctx.parsedPath = matched.params;
      return pageConfig;
    }
  }
}
exports.default = getPageConfig;
//# sourceMappingURL=getPageConfigFactory.js.map
