import { join } from "path";
import config from "@orgasmo/orgasmo/config";
import parseDirectory, {
  idsToFilePath,
  waitForIt,
} from "../page/parseDirectory";
import { remove } from "fs-extra";

export default async function SavePageConfig(ctx, pageId) {
  await waitForIt;

  const filePath =
    idsToFilePath.get(pageId) ??
    join(
      process.cwd(),
      config["driver.@orgasmo.json.pagePath"],
      `${pageId}.json`
    );

  await remove(filePath);

  await parseDirectory(ctx.driver["@orgasmo"].json.pagesPath);
}
