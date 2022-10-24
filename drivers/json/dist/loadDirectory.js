"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDirectory =
  exports.doTheParsing =
  exports.ids =
  exports.paths =
    void 0;
const util_1 = require("util");
const glob_1 = require("glob");
const pathRoRegExp = require("path-to-regexp");
const fs_extra_1 = require("fs-extra");
const path_1 = require("path");
const match = pathRoRegExp.match;
const glob = (0, util_1.promisify)(glob_1.glob);
exports.paths = new Map();
exports.ids = new Map();
let waitForIt;
async function doTheParsing(pathToJsonDirectory) {
  const tempPaths = new Map();
  const files = await glob(
    (0, path_1.join)(process.cwd(), pathToJsonDirectory, "/**/*.json")
  );
  for (const pagePath of files) {
    const pageConfig = await (0, fs_extra_1.readJson)(pagePath, {
      throws: false,
    });
    if (!pageConfig) {
      console.error(`Something wrong with ${pagePath}`);
      continue;
    }
    if (!pageConfig.path) {
      console.error(`${pagePath} is missing the required field "path"`);
      continue;
    }
    if (!pageConfig.id) {
      console.error(`${pagePath} is missing the required field "id"`);
      continue;
    }
    if (exports.ids.has(pageConfig.id)) {
      console.error(
        `there is already a pageConfig with the id ${pageConfig.id}`
      );
      continue;
    }
    exports.ids.set(pageConfig.id, pageConfig);
    const current = tempPaths.get(pageConfig.path);
    if (!current) {
      tempPaths.set(pageConfig.path, pageConfig);
      continue;
    }
    if (Array.isArray(current)) {
      current.push(pageConfig);
      continue;
    }
    tempPaths.set(pageConfig.path, [current, pageConfig]);
  }
  const sortedPaths = Array.from(tempPaths.keys());
  sortedPaths.sort((a, b) => {
    const lastA = a.replace(/\/:/g, "/￾").replace(/\/:/g, "/￿");
    const lastB = b.replace(/\/:/g, "/￾").replace(/\/:/g, "/￿");
    return lastA < lastB ? -1 : 1;
  });
  for (const path of sortedPaths) {
    exports.paths.set(path, {
      match: match(path),
      pageConfig: tempPaths.get(path),
    });
  }
}
exports.doTheParsing = doTheParsing;
async function parseDirectory(pathToJsonDirectory) {
  console.log(waitForIt);
  if (waitForIt) {
    return waitForIt;
  }
  waitForIt = doTheParsing(pathToJsonDirectory);
  return waitForIt;
}
exports.parseDirectory = parseDirectory;
//# sourceMappingURL=loadDirectory.js.map
