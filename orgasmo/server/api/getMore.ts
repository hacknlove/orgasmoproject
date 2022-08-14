import { cleanAwaitJson } from "../lib/cleanJson";

export default async function getMore({ req, res, command: { handler, ...params }, driver }) {
    res.json(
        await cleanAwaitJson(
            driver[handler]({
                ...params,
                from: parseInt(req.query.from),
                count: parseInt(req.query.count),
            })
        )
    )
}