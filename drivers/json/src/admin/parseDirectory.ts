import { promisify } from "util";
import { glob as g } from "glob";
import { readJson } from "fs-extra";
import { join } from "path";
import { watch } from "chokidar";
import { storiesPath } from "../consts";
import logger from "@orgasmo/orgasmo/logger";

const glob = promisify(g);

export const Components = {};
export const storiesPaths = {};

let resolve;
export const waitForIt = new Promise((r) => (resolve = r));

export default async function parseDirectory() {
  for (const key in Components) {
    delete Components[key];
    delete storiesPaths[key];
  }

  const files = await glob(join(process.cwd(), storiesPath, "/**/*.json"));

  for (const storyPath of files) {
    const storyConfig = await readJson(storyPath, { throws: false });

    if (!storyConfig) {
      logger.error({ storyPath }, `Error reading %s`, storiesPath);
      continue;
    }

    const component = storyConfig.itemConfig.type;
    const story = storyConfig.story;

    Components[component] ??= {};
    Components[component][story] = storyConfig;

    storiesPaths[component] ??= {};
    storiesPaths[component][story] = storyPath;
  }
  resolve();
}

if (process.env.NODE_ENV === "development") {
  const watcher = watch(storiesPath, {
    ignoreInitial: true,
    awaitWriteFinish: true,
  });

  watcher.on("add", parseDirectory);
  watcher.on("unlink", parseDirectory);
  watcher.on("change", parseDirectory);
}
