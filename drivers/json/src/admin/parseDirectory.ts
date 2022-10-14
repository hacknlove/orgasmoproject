import { promisify } from "util";
import { glob as g } from "glob";
import { readJson } from "fs-extra";
import { join } from "path";

const glob = promisify(g);

export const Components = {};

let resolve;
export const waitForIt = new Promise((r) => (resolve = r));

export default async function parseDirectory(pathToJsonDirectory) {
  for (const key in Components) {
    delete Components[key];
  }

  const files = await glob(
    join(process.cwd(), pathToJsonDirectory, "/**/*.json")
  );

  for (const storyPath of files) {
    const storyConfig = await readJson(storyPath, { throws: false });

    if (!storyConfig) {
      console.error(`Something wrong with ${storyPath}`);
      continue;
    }

    const { component, story, ...config } = storyConfig;

    Components[component] ??= {};
    Components[component][story] = config;
  }
  resolve();
}
