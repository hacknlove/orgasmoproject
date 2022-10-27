import { join } from "path";
import { storiesPath } from "../consts";
import parseDirectory, { storiesPaths } from "./parseDirectory";
import { remove } from "fs-extra";

export default async function SavePageConfig(ctx, { component, story }) {
  const filePath =
    storiesPaths[component]?.[story] ??
    join(process.cwd(), storiesPath, `${component}/${story}.json`);

  await remove(filePath);

  await parseDirectory();
}
