import { promisify } from "util";
import { glob as g } from "glob";
import { readJson } from "fs-extra";
import { join } from "path";
import logger from "@orgasmo/orgasmo/logger";
import { watch } from "chokidar";

const glob = promisify(g);

export const kvStorage = {};
export const keysToFilePath = {};

let resolve;
export const waitForIt = new Promise((r) => (resolve = r));

export default async function parseDirectory(kvStoragePath) {
  for (const key in kvStorage) {
    delete kvStorage[key];
    delete keysToFilePath[key];
  }

  const files = await glob(join(process.cwd(), kvStoragePath, "/**/*.json"));

  for (const keyPath of files) {
    const kvStorage = await readJson(keyPath, { throws: false });

    if (!kvStorage) {
      logger.error({ keyPath }, `Error reading %s`, kvStoragePath);
      continue;
    }

    kvStorage[kvStorage.key] = kvStorage.value;
    keysToFilePath[kvStorage.key] = keyPath;
  }
  resolve();
}

export function watchValues(kvStoragePath) {
  const watcher = watch(kvStoragePath, {
    ignoreInitial: true,
    awaitWriteFinish: true,
  });

  watcher.on("add", () => parseDirectory(kvStoragePath));
  watcher.on("unlink", () => parseDirectory(kvStoragePath));
  watcher.on("change", () => parseDirectory(kvStoragePath));
}
