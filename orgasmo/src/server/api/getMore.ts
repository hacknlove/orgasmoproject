import cacheControl from "../lib/cacheControl";
import { cleanAwaitJson } from "../lib/cleanJson";
import { serialize } from "../lib/serialization";
import { currentTimeChunk } from "../lib/timechunks";
import parseCommand from "./parseCommand";

export default async function getMore({ req, res, driver }) {
  const command = await parseCommand({ req, res, driver });

  if (!command) {
    return;
  }

  const response = await cleanAwaitJson(
    driver[command.handler]({
      ...command,
      from: parseInt(req.query.from),
      count: parseInt(req.query.count),
    })
  );

  if (response.getMore) {
    response.src = `/api/_ogm?c=${serialize({
      ...response.getMore,
      expire: currentTimeChunk(response.timeChunk).expire,
      roles: req.user.roles,
    })}`;
    delete response.getMore;
  }

  cacheControl({ ctx: { res }, item: response });

  delete response.timeChunk;
  delete response.private;

  res.json(response);
}
