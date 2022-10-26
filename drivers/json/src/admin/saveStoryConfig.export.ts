import { writeJson } from "fs-extra";
import { join } from "path";
import { storiesPath } from "../consts";
import parseDirectory, { storiesPaths } from "./parseDirectory";

export default async function SavePageConfig(ctx, storyConfig) {
  const component = storyConfig.itemConfig.type;
  const story = storyConfig.story;
  const filePath =
    storiesPaths[component][story] ??
    join(process.cwd(), storiesPath, `${component}/${story}.json`);

  await writeJson(filePath, storyConfig, { spaces: 2 });

  await parseDirectory();
}
