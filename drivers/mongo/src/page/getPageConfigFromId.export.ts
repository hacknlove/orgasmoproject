import mongoProxy from "../mongoProxy";

export default async function getPageConfigFromId(pageId) {
  await mongoProxy.connect();
  return mongoProxy.pages.findOne({ pageId });
}
