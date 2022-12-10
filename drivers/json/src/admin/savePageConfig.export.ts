import { outputJson } from "fs-extra";
import { join } from "path";
import config from "@orgasmo/orgasmo/config";

import parseDirectory, {
  idsToFilePath,
  waitForIt,
} from "../page/parseDirectory";

export default async function SavePageConfig(ctx, pageConfig) {
  await waitForIt;

  const filePath =
    idsToFilePath.get(pageConfig.pageId) ??
    join(
      process.cwd(),
      config["drivers.@orgasmo.json.pagesPath"],
      `${pageConfig.pageId}.json`
    );

  await outputJson(filePath, pageConfig, { spaces: 2 });

  await parseDirectory(config["drivers.@orgasmo.json.pagePath"]);
}
