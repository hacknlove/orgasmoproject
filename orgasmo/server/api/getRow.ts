import processRow from "../lib/processRow";
import chooseOne from "../lib/chooseOne";
import { cleanAwaitJson } from "../lib/cleanJson";
import getStaticRandom from "../lib/getStaticRandom";
import { serialize } from "../lib/serialization";
import parseCommand from "./parseCommand";

export default async function getRow({ req, res, driver }) {
    const command = await parseCommand({ req, res, driver })
    if (!command) {
        return
    }

    let rowConfig = await driver.page.getRow({ ...command, number: parseInt(req.query.n) })

    if (Array.isArray(rowConfig)) {
        rowConfig = chooseOne({ array: rowConfig, staticRandom: getStaticRandom({ req, res }) });
    }

    if (!rowConfig) {
        return res.json(null)
    }

    const row = await cleanAwaitJson(await processRow({ rowConfig, params: command.params, driver }))

    if (row.props.getMore) {
        row.props.getMore = serialize({
            ...row.props.getMore,
            expire: Date.now() + 3600000,
            userId: req.user.id,
        })
    }

    return res.json(row)
}