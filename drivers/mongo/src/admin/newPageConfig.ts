import mongoProxy from "../mongoProxy";

const pageConfigsCollectionName =
  (process.env.ORGASMO_MONGO_PAGES_COLLECTION as string) ?? "pageConfigs";

export default async function newPageConfig(ctx, pageConfig) {
  await mongoProxy.connect();

  await mongoProxy[pageConfigsCollectionName].insertOne(pageConfig);

  return { ok: true };
}
