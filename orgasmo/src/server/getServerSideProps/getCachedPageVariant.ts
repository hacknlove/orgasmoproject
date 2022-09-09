import chooseOne from "../lib/chooseOne";
import { cencode, decencode } from "cencode";
import cacheGet from "../cache/cacheGet";
import getPageFromConfig from "./getPageFromConfig";
import sendFullPage from "./sendFullPage";
import events from "../events";

export default async function getCachedPageVariant({ pageIds, ctx, key }) {
  const pageId = chooseOne({ array: pageIds, ctx });
  const newKey = cencode({ ...decencode(key), pageId });

  const pageConfig = await cacheGet({ ctx, key: newKey });

  if (!pageConfig) {
    return getPageFromConfig(ctx);
  }

  if (pageConfig.response) {
    return sendFullPage({ ctx, pageConfig });
  }

  events.emit("error", {
    type: "internal",
    message: "Cached variant is not full",
  });

  return {
    notFound: true,
  };
}
