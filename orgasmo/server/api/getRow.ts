import processRow from "../lib/processRow";
import { cleanAwaitJson } from "../lib/cleanJson";
import { serialize } from "../lib/serialization";
import parseCommand from "./parseCommand";
import { currentTimeChunk } from "../lib/timechunks";
import cacheControl from "../lib/cacheControl";

export default async function getRow(ctx) {
  const { req, res, driver } = ctx;
  const command = await parseCommand({ req, res, driver });
  if (!command) {
    return res.json(null);
  }

  const page = await driver.page.getPageFromId(command.pageId);
  if (!page) {
    return res.json(null);
  }

  const number = parseInt(req.query.n);

  const rowConfig =
    page.rows?.[number] ??
    (await driver[page.getRow]?.({
      ...command,
      number,
      relative: number - (page.rows?.length ?? 0),
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
