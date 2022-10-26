import { promisify } from "util";
import { glob as g } from "glob";
import { match } from "path-to-regexp";
import { readJson } from "fs-extra";
import { join } from "path";
import * as Ajv from "ajv";
import { watch } from "chokidar";
import { pagesPath } from "../consts";
import * as pageConfigSchema from "../schemas/pageConfigSchema.json";

const glob = promisify(g);

const ajv = new Ajv();

const validate = ajv.compile(pageConfigSchema);

export const dynamicPaths = new Map();
export const staticPaths = new Map();
export const ids = new Map();
export const idsToFilePath = new Map();

let resolve;
export const waitForIt = new Promise((r) => (resolve = r));

export default async function parseDirectory() {
  const tempStaticPaths = new Map();
  const tempDynamicPaths = new Map();

  const oldIds = new Set(ids.keys());

  const files = await glob(join(process.cwd(), pagesPath, "/**/*.json"));

  for (const filePath of files) {
    const pageConfig = await readJson(filePath, { throws: false });

    if (!pageConfig) {
      console.error(`Something wrong with ${filePath}`);
      continue;
    }

    const valid = validate(pageConfig);

    if (!valid) {
      console.error(
        `${filePath}:\n${JSON.stringify(validate.errors, null, 4)}`
      );
      continue;
    }

    if (ids.has(pageConfig.pageId) && !oldIds.has(pageConfig.pageId)) {
      console.error(
        `There is already a pageConfig with the pageId "${pageConfig.pageId}"`
      );
    }

    idsToFilePath.set(pageConfig.pageId, filePath);

    ids.set(pageConfig.pageId, pageConfig);
    oldIds.delete(pageConfig.pageId);

    let bucket;
    let path;

    if (pageConfig.exactPath) {
      bucket = tempStaticPaths;
      path = pageConfig.exactPath;
    } else {
      bucket = tempDynamicPaths;
      path = pageConfig.patternPath;
    }

    ids.set(pageConfig.pageId, pageConfig);
    oldIds.delete(pageConfig.pageId);

    const current = bucket.get(path);

    if (!current) {
      bucket.set(path, pageConfig);
      continue;
    }

    if (Array.isArray(current)) {
      current.push(pageConfig);
      continue;
    }

    bucket.set(path, [current, pageConfig]);
  }

  const sortedDynamicPaths = Array.from(tempDynamicPaths.keys());

  sortedDynamicPaths.sort((a, b) => {
    const lastA = a
      .replace(/:[^/]+\(/g, "\uFFFE")
      .replace(/\(/g, "\uFFFF")
      .replace(/:[^/]*/, "\uFFFD");
    const lastB = b
      .replace(/:[^/]+\(/g, "\uFFFE")
      .replace(/\(/g, "\uFFFF")
      .replace(/:[^/]*/, "\uFFFD");

    return lastA < lastB ? -1 : 1;
  });

  dynamicPaths.clear();
  for (const path of sortedDynamicPaths) {
    dynamicPaths.set(path, {
      match: match(path),
      pageConfig: tempDynamicPaths.get(path),
    });
  }

  staticPaths.clear();
  for (const [path, config] of tempStaticPaths) {
    staticPaths.set(path, config);
  }

  for (const oldId of oldIds) {
    ids.delete(oldId);
    idsToFilePath.delete(oldId);
  }

  resolve();
}

if (process.env.NODE_ENV === "development") {
  const watcher = watch(pagesPath, {
    ignoreInitial: true,
    awaitWriteFinish: true,
  });

  watcher.on("add", parseDirectory);
  watcher.on("unlink", parseDirectory);
  watcher.on("change", parseDirectory);
}
