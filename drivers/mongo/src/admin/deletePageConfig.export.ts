import mongoProxy from "../mongoProxy";

const pageConfigsCollectionName =
  (process.env.ORGASMO_MONGO_PAGES_COLLECTION as string) ?? "pageConfigs";

export default async function deletePageConfig(ctx, pageId) {
  await mongoProxy.waitfor;

  await mongoProxy.pages.deleteOne({
    pageId,
  });

  return true;
}
