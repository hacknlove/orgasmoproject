import mongoProxy from "../mongoProxy";

const pageConfigsCollectionName =
  (process.env.ORGASMO_MONGO_PAGES_COLLECTION as string) ?? "pageConfigs";

export default async function getAllPages() {
  await mongoProxy.connect();

  const pagesArray = await mongoProxy[pageConfigsCollectionName]
    .find({}, { projection: { _id: 0 } })
    .toArray();
  const pages = {};

  for (const { exactPath, patternPath, pageId, ...pageConfig } of pagesArray) {
    const path = exactPath ?? patternPath;
    pages[path] ??= {};
    pages[path][pageId] = pageConfig;
  }

  return pages;
}
