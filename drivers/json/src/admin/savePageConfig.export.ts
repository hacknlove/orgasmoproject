import { writeJson } from "fs-extra";
import { join } from "path";
import { pagesPath } from "../consts";
import parseDirectory, { idsToFilePath } from "../page/parseDirectory";

export default async function SavePageConfig(ctx, pageConfig) {
  const filePath =
    idsToFilePath.get(pageConfig.pageId) ??
    join(process.cwd(), pagesPath, `${pageConfig.pageId}.json`);

  await writeJson(filePath, pageConfig);

  await parseDirectory();
}
