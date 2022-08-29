import CacheControl from "../lib/cacheControl";
import setCookies from "../lib/setCookies";

export default async function sendFullPage({ ctx, pageConfig }) {
  setCookies({ ctx, cookies: pageConfig.cookies });
  await CacheControl({ ctx, item: pageConfig });
  return pageConfig.response;
}
