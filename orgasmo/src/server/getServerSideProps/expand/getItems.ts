import processRow from "../../lib/processRow";
import { serialize } from "../../lib/serialization";
import { maxTimeChunk } from "../../lib/timechunks";
import type { currentChunkReturn } from "../../lib/timechunks";
import skipThisRow from "../../lib/skipThisRow";

interface getItemsParameters {
  items: any[];
  params?: Record<string, any>;
  ctx: Record<string, any>;
  limit?: number;
  timeChunk: currentChunkReturn;
  getItem?: string;
}

export default async function getItems({
  items: itemsProp = [],
  params,
  ctx,
  limit = Infinity,
  timeChunk,
  getItem,
}: getItemsParameters) {
  const items: any[] = [];

  const z =
    limit === Infinity || limit === -1 || limit === null
      ? itemsProp.length
      : limit;

  for (let i = 0; i < z; i++) {
    const rowConfig =
      itemsProp[i] ??
      (getItem &&
        (await ctx.driver[getItem]?.({
          params,
          number: i,
          relative: i - itemsProp.length,
        })));

    if (!rowConfig) {
      break;
    }

    const rowTimeChunk = maxTimeChunk({
      timeChunkConf: rowConfig.timeChunk,
      timeChunk,
    });

    const row =
      skipThisRow({ rowConfig, ctx }) ||
      (await processRow({ rowConfig, params, ctx }));
    if (row?.props?.getMore) {
      row.props.src = `/api/_ogm?c=${serialize({
        ...row.props.getMore,
        roles: ctx.req.user.roles,
        expire: rowTimeChunk.expire,
      })}`;
      delete row.props.getMore;
    }

    if (row?.props?.cssVars) {
      row.props.cssVars = Object.fromEntries(
        Object.entries(row.props.cssVars).map(([key, value]) => [
          `--${key}`,
          value,
        ])
      );
    }

    items.push(row);
    if (!--limit) {
      break;
    }
  }

  return items;
}
