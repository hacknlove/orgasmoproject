import { join } from "path";
import config from "@orgasmo/orgasmo/config";
import parseDirectory, { storiesPaths, waitForIt } from "./parseDirectory";
import { remove } from "fs-extra";

export default async function SavePageConfig(ctx, { component, story }) {
  await waitForIt;

  const filePath =
    storiesPaths[component]?.[story] ??
    join(
      process.cwd(),
      config["drivers.@orgasmo.json.storiesPath"],
      `${component}/${story}.json`
    );

  await remove(filePath);

  await parseDirectory(config["drivers.@orgasmo.json.storiesPath"]);
}
