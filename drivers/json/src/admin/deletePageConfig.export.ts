import { join } from "path";
import { pagesPath } from "../consts";
import parseDirectory, { idsToFilePath } from "../page/parseDirectory";
import { remove } from 'fs-extra'

export default async function SavePageConfig(ctx, pageId) {
  const filePath =
    idsToFilePath.get(pageId) ??
    join(process.cwd(), pagesPath, `${pageId}.json`);

  await remove(filePath);

  await parseDirectory();
}
