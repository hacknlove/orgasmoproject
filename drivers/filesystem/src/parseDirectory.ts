import { promisify } from "util";
import { glob as g } from "glob";
import { match } from "path-to-regexp";
import { readJson } from "fs-extra";
import { join } from "path";
import * as Ajv from "ajv";

import * as pageConfigSchema from './pageConfigSchema.json'

const glob = promisify(g);

const ajv = new Ajv()

const validate = ajv.compile(pageConfigSchema)

export const dynamicPaths = new Map();
export const staticPaths = new Map();
export const ids = new Map();

let resolve;
export const waitForIt = new Promise((r) => (resolve = r));



export default async function parseDirectory(pathToJsonDirectory) {
  const tempStaticPaths = new Map();
  const tempDynamicPaths = new Map();

  const oldIds = new Set(ids.keys());

  const files = await glob(
    join(process.cwd(), pathToJsonDirectory, "/**/*.json")
  );

  for (const pagePath of files) {
    const pageConfig = await readJson(pagePath, { throws: false });

    if (!pageConfig) {
      console.error(`Something wrong with ${pagePath}`);
      continue;
    }

    const valid = validate(pageConfig)

    if (!valid) {
      console.error(`${pagePath}:\n${JSON.stringify(validate.errors, null, 4)}`);
      continue;
    }

    ids.set(pageConfig.pageId, pageConfig);
    oldIds.delete(pageConfig.pageId);

    let bucket
    let path

    if (pageConfig.staticPath) {
      bucket = tempStaticPaths
      path = pageConfig.staticPath
    } else {
      bucket = tempDynamicPaths
      path = pageConfig.dynamicPath
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
      .replace(/\/:/g, "/￾") // unicode FFFE before last character
      .replace(/\/\(/g, "/￿"); // unicode FFFF last character
    const lastB = b
      .replace(/\/:/g, "/￾") // unicode FFFE before last character
      .replace(/\/\(/g, "/￿"); // unicode FFFF last character

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
    staticPaths.set(path, config)
  }

  for (const oldId of oldIds) {
    ids.delete(oldId);
  }

  resolve();
}
