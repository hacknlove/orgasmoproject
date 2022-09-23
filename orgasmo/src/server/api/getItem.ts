import processRow from "../lib/processRow";
import { cleanAwaitJson } from "../lib/cleanJson";
import { serialize } from "../lib/serialization";
import parseCommand from "./parseCommand";
import { currentTimeChunk } from "../lib/timechunks";
import cacheControl from "../lib/cacheControl";

export default async function getItem(ctx) {
  const { req, res, driver } = ctx;
  const command = await parseCommand({ req, res, driver });

  if (!command) {
    return res.json(null);
  }

  const pageConfig = await driver.page.getPageConfigFromId(command.pageId, ctx);
  if (!pageConfig) {
    return res.json(null);
  }

  if (!pageConfig.areas[command.area]) {
    return res.json(null);
  }

  const areaConfig = pageConfig.areas[command.area];

  const number = parseInt(req.query.n);

  const rowConfig =
    areaConfig.items?.[number] ??
    (await driver[areaConfig.getItem]?.({
      ...command,
      number,
      relative: number - (areaConfig.items?.length ?? 0),
    }));

  if (!rowConfig) {
    return res.json(null);
  }

  const row = await cleanAwaitJson(
    await processRow({ rowConfig, params: command.params, ctx })
  );

  if (row.props.getMore) {
    row.props.src = `/api/_ogm?c=${serialize({
      ...row.props.getMore,
      expire: currentTimeChunk(rowConfig.timeChunk).expire,
      roles: req.user.roles,
    })}`;
    delete row.props.getMore;
  }

  cacheControl({ ctx: { res }, item: rowConfig });

  res.json({
    row,
    src: `/api/_ogr?c=${serialize({
      ...command,
      expire: currentTimeChunk(rowConfig.timeChunk).expire,
      roles: req.user.roles,
    })}`,
  });
}
