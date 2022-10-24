import mongoProxy from "../mongoProxy";

const siteCollectionName =
  (process.env.ORGASMO_MONGO_SITE_COLLECTION as string) ?? "site";

export default async function upsertStoryConfig(ctx, siteConfig) {
  await mongoProxy.connect();

  delete siteConfig._id;

  await mongoProxy[siteCollectionName].updateOne(
    {},
    {
      $set: siteConfig,
    },
    {
      upsert: true,
    }
  );

  return { ok: true };
}
