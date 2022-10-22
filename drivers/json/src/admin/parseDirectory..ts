import { promisify } from "util";
import { glob as g } from "glob";
import { readJson } from "fs-extra";
import { join } from "path";
import { watch } from "chokidar";

const glob = promisify(g);

export const Components = {};

const dataPath =
  process.env.FILESYSTEM_DATA_PATH ?? "drivers/@orgasmo/json/data";

const storiesPath = `${dataPath}/stories`;

let resolve;
export const waitForIt = new Promise((r) => (resolve = r));

export default async function parseDirectory() {
  for (const key in Components) {
    delete Components[key];
  }

  const files = await glob(join(process.cwd(), storiesPath, "/**/*.json"));

  for (const storyPath of files) {
    const storyConfig = await readJson(storyPath, { throws: false });

    if (!storyConfig) {
      console.error(`Something wrong with ${storyPath}`);
      continue;
    }

    const component = storyConfig.itemConfig.component;
    const story = storyConfig.story;

    Components[component] ??= {};
    Components[component][story] = storyConfig;
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
