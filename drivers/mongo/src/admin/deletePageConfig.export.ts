import mongoProxy from "../mongoProxy";

const pageConfigsCollectionName =
  (process.env.ORGASMO_MONGO_PAGES_COLLECTION as string) ?? "pageConfigs";

export default async function deletePageConfig(ctx, pageId) {
  await mongoProxy.connect();

  await mongoProxy[pageConfigsCollectionName].deleteOne({
    pageId,
  });

  return { ok: true };
}
