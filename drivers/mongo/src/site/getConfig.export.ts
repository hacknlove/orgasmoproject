import mongoProxy from "../mongoProxy";

const siteCollectionName =
  (process.env.ORGASMO_MONGO_SITE_COLLECTION as string) ?? "site";

export default async function getConfig() {
  await mongoProxy.connect();

  return (await mongoProxy[siteCollectionName].findOne({})) ?? {};
}
