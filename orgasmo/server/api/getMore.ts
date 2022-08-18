import { cleanAwaitJson } from "../lib/cleanJson";
import { serialize } from "../lib/serialization";
import parseCommand from "./parseCommand";

export default async function getMore({ req, res, driver }) {
    const command = await parseCommand({ req, res, driver })

    if (!command) {
        return
    }

    const response = await cleanAwaitJson(
        driver[command.handler]({
            ...command,
            from: parseInt(req.query.from),
            count: parseInt(req.query.count),
        })
    )
    if (response.getMore) {
        response.getMore = serialize({
            ...response.getMore,
            expire: Date.now() + 3600000,
            userId: req.user.id,
        })
    }
    res.json(response)
}