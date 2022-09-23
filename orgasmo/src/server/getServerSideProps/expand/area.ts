import { serialize } from "../../lib/serialization";
import getItems from "../getItems";

export async function expandArea({
  ctx,
  name,
  pageId,
  params,
  timeChunk,
  areaConfig,
}) {
  const items = getItems({
    ctx,
    params,
    items: areaConfig.items,
    limit: areaConfig.ssrSize,
    timeChunk,
    getItem: areaConfig.getItem,
  });

  const area = {
    ...areaConfig,
    items,
  };

  if (
    !area.src &&
    (areaConfig.mode === "bublle" || areaConfig.mode === "grow") &&
    areaConfig.getItem
  ) {
    area.src = `/api/_ogr?c=${serialize({
      pageId,
      area: name,
      params,
      roles: ctx.req.user.roles,
      expire: timeChunk.expire,
    })}`;
  }

  return area;
}
