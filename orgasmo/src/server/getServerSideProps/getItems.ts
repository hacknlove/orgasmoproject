import processRow from "../lib/processRow";
import { serialize } from "../lib/serialization";
import { maxTimeChunk } from "../lib/timechunks";
import type { currentChunkReturn } from "../lib/timechunks";

interface getItemsParameters {
  items: any[];
  params?: Record<string, any>;
  ctx: Record<string, any>;
  limit?: number;
  timeChunk: currentChunkReturn;
  getItemConfig?: (any) => any;
}

export default async function getItems({
  items: itemsProp,
  params,
  ctx,
  limit = Infinity,
  timeChunk,
  getItemConfig,
}: getItemsParameters) {
  if (!itemsProp) {
    return [];
  }

  const items: any[] = [];

  const z = limit === Infinity ? itemsProp.length : limit;

  for (let i = 0; i < z; i++) {
    const rowConfig =
      itemsProp[i] ??
      (await getItemConfig?.({
        params,
        number: i,
        relative: i - itemsProp.length,
      }));

    if (!rowConfig) {
      break;
    }
    if (Array.isArray(rowConfig.cookies)) {
      ctx.setCookies.push(...rowConfig.cookies);
    } else if (rowConfig.cookies) {
      ctx.setCookies.push(rowConfig.cookies);
    }

    const rowTimeChunk = maxTimeChunk({
      timeChunkConf: rowConfig.timeChunk,
      timeChunk,
    });

    const row = await processRow({ rowConfig, params, ctx });
    if (row?.props?.getMore) {
      row.props.src = `/api/_ogm?c=${serialize({
        ...row.props.getMore,
        roles: ctx.req.user.roles,
        expire: rowTimeChunk.expire,
      })}`;
      delete row.props.getMore;
    }

    items.push(row);
    if (!--limit) {
      break;
    }
  }

  return items;
}
