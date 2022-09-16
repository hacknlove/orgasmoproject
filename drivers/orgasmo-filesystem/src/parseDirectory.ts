import { promisify } from "util";
import { glob as g } from "glob";
import { match } from "path-to-regexp";
import { readJson } from "fs-extra";
import { join } from "path";

const glob = promisify(g);

export const paths = new Map();
export const ids = new Map();

let resolve;
export const waitForIt = new Promise((r) => (resolve = r));

export default async function parseDirectory(pathToJsonDirectory) {
  const tempPaths = new Map();

  const files = await glob(
    join(process.cwd(), pathToJsonDirectory, "/**/*.json")
  );

  for (const pagePath of files) {
    const pageConfig = await readJson(pagePath, { throws: false });

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

    if (ids.has(pageConfig.id)) {
      console.error(
        `There is already a pageConfig with the id "${pageConfig.id}"`
      );
      continue;
    }

    ids.set(pageConfig.id, pageConfig);

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
    const lastA = a
      .replace(/\/:/g, "/￾") // unicode FFFE before last character
      .replace(/\/\(/g, "/￿"); // unicode FFFF last character
    const lastB = b
      .replace(/\/:/g, "/￾") // unicode FFFE before last character
      .replace(/\/\(/g, "/￿"); // unicode FFFF last character

    return lastA < lastB ? -1 : 1;
  });

  for (const path of sortedPaths) {
    paths.set(path, {
      match: match(path),
      pageConfig: tempPaths.get(path),
    });
  }

  resolve();
}
