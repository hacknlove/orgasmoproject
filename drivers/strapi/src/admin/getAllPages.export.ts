import strapiFetch from "../strapiFetch";

export default async function getAllPages() {
  const pages = {};
  let page = 1;

  while (true) {
    const pagesArray = await strapiFetch(
      `page-configs?pagination[page]=${page}`
    );

    for (const pageConfig of pagesArray.data) {
      const { exactPath, patternPath, pageId } = pageConfig.attributes;
      const path = exactPath ?? patternPath;
      pages[path] ??= {};
      pages[path][pageId] = pageConfig.description ?? "";
    }
    if (page >= pagesArray.meta.pageCount) {
      break;
    }
    page++;
  }
  return pages;
}
