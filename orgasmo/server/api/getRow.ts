import processRow from "../lib/processRow";
import chooseOne from "../lib/chooseOne";
import { cleanAwaitJson } from "../lib/cleanJson";
import getStaticRandom from "../lib/getStaticRandom";
import { serialize } from "../lib/serialization";

export default async function getRow({ req, res, command, driver }) {
    let rowConfig = await driver.page.getRow({ pageId: command.pageId, params: command.params, number: parseInt(req.query.n) })

    if (Array.isArray(rowConfig)) {
        rowConfig = chooseOne({ array: rowConfig, staticRandom: getStaticRandom({ req, res }) });
    }

    if (!rowConfig) {
        return res.json(null)
    }

    const row = await cleanAwaitJson(await processRow({ rowConfig, params: command.params, driver }))

    if (row.props.getMore) {
        row.props.getMore = serialize({
            getMore: row.props.getMore,
            expire: Date.now() + 3600000,
            userId: req.user.id,
        })
    }

    return res.json(row)
}