import mongoProxy from "../mongoProxy";

const pageConfigsCollectionName =
  (process.env.ORGASMO_MONGO_PAGES_COLLECTION as string) ?? "pageConfigs";

export default async function SavePageConfig(ctx, pageConfig) {
  await mongoProxy.waitfor;

  delete pageConfig._id;

  await mongoProxy[pageConfigsCollectionName].updateOne(
    {
      pageId: pageConfig.pageId,
    },
    {
      $set: pageConfig,
    },
    {
      upsert: true,
    }
  );

  return { ok: true };
}
