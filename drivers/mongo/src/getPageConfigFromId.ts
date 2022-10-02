import mongoProxy from "./mongoProxy";

const pageConfigsCollectionName =
  (process.env.ORGASMO_MONGO_PAGES_COLLECTION as string) ?? "pageConfigs";

export default async function getPageConfigFromId(pageId) {
  return mongoProxy[pageConfigsCollectionName].findOne({ pageId });
}
