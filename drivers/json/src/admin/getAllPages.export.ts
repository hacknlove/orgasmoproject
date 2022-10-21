import { waitForIt, ids } from "../page/parseDirectory";

export default async function getAllPages() {
  await waitForIt;

  const pagesArray = Array.from(ids.values());

  const pages = {};

  for (const pageConfig of pagesArray) {
    const { exactPath, patternPath, pageId } = pageConfig;
    const path = exactPath ?? patternPath;
    pages[path] ??= {};
    pages[path][pageId] = pageConfig;
  }

  return pages;
}
