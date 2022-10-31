import { promisify } from "util";
import { glob as g } from "glob";
import { readJson } from "fs-extra";
import { join } from "path";
import { watch } from "chokidar";
import { kvStoragePath } from "../consts";
import logger from "@orgasmo/orgasmo/logger";

const glob = promisify(g);

export const kvStorage = {};
export const keysToFilePath = {};

let resolve;
export const waitForIt = new Promise((r) => (resolve = r));

export default async function parseDirectory() {
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

if (process.env.NODE_ENV === "development") {
  const watcher = watch(kvStoragePath, {
    ignoreInitial: true,
    awaitWriteFinish: true,
  });

  watcher.on("add", parseDirectory);
  watcher.on("unlink", parseDirectory);
  watcher.on("change", parseDirectory);
}
