import mongoProxy from "../mongoProxy";

const siteCollectionName =
  (process.env.ORGASMO_MONGO_SITE_COLLECTION as string) ?? "kvStorage";

export default async function getConfig(ctx, key) {
  await mongoProxy.waitfor;

  return (
    (await mongoProxy[siteCollectionName].findOne(
      { key },
      { projection: { _id: 0 } }
    )) ?? {}
  );
}
