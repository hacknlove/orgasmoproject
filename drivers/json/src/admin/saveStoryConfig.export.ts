import { outputJson } from "fs-extra";
import { join } from "path";
import parseDirectory, { storiesPaths, waitForIt } from "./parseDirectory";
import config from "@orgasmo/orgasmo/config";

export default async function SavePageConfig(ctx, storyConfig) {
  await waitForIt;

  const component = storyConfig.itemConfig.type;
  const story = storyConfig.story;
  const filePath =
    storiesPaths[component]?.[story] ??
    join(
      process.cwd(),
      config["driver.@orgasmo.json.storiesPath"],
      `${component}/${story}.json`
    );

  await outputJson(filePath, storyConfig, { spaces: 2 });

  await parseDirectory(config["driver.@orgasmo.json.storiesPath"]);
}
