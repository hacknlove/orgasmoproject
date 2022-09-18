import mongoProxy from "./mongoProxy";

export default async function getPageConfigFromId(pageId) {
  return mongoProxy.pageConfigs.findOne({ pageId });
}
