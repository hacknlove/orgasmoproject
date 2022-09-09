import cacheControl from "../lib/cacheControl";
import setCookies from "../lib/setCookies";

export default async function sendFullPage({ ctx, pageConfig }) {
  setCookies({ ctx, cookies: pageConfig.cookies });
  await cacheControl({ ctx, item: pageConfig });
  return pageConfig.response;
}
