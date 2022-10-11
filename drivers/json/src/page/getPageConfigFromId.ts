import { waitForIt, ids } from "../parseDirectory";

export default async function getPageConfigFromId(pageId) {
  await waitForIt;
  return ids.get(pageId);
}
