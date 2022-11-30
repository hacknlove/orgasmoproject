import mongoProxy from "../mongoProxy";

const pageConfigsCollectionName =
  (process.env.ORGASMO_MONGO_PAGES_COLLECTION as string) ?? "pageConfigs";

export default async function getAllPages() {
  await mongoProxy.waitfor;

  const pagesArray = await mongoProxy[pageConfigsCollectionName]
    .find({}, { projection: { _id: 0 } })
    .toArray();
  const pages = {};

  for (const pageConfig of pagesArray) {
    const { exactPath, patternPath, pageId } = pageConfig;
    const path = exactPath ?? patternPath;
    pages[path] ??= {};
    pages[path][pageId] = pageConfig.description ?? "";
  }

  return pages;
}
