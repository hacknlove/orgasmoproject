import cacheNewExpirationTimeout from "./cacheNewExpirationTimeout";
import { expireTimeout } from "./maps";

export default function cacheExtendExpirationTimeout({ ctx, key, item }) {
  const expire = expireTimeout.get(key);

  if (!expire) {
    return;
  }
  clearTimeout(expire);
  cacheNewExpirationTimeout({ ctx, key, item });
}
