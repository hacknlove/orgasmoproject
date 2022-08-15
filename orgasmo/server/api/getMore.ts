import { cleanAwaitJson } from "../lib/cleanJson";
import { serialize } from "../lib/serialization";

export default async function getMore({ req, res, command: { handler, ...params }, driver }) {
    const response = await cleanAwaitJson(
        driver[handler]({
            ...params,
            from: parseInt(req.query.from),
            count: parseInt(req.query.count),
        })
    )
    if (response.getMore) {
        response.getMore = serialize({
            getMore: response.getMore,
            expire: Date.now() + 3600000,
            userId: req.user.id,
        })
    }
    res.json(response)
}