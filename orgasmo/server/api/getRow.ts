import processRow from "../lib/processRow";
import chooseOne from "../lib/chooseOne";
import { cleanAwaitJson } from "../lib/cleanJson";
import getStaticRandom from "../lib/getStaticRandom";

export default async function getRow({ req, res, command, driver }) {
    let rowConfig = await driver.pages.getRow({ getRow: command, number: parseInt(req.query.n) })

    if (Array.isArray(rowConfig)) {
        rowConfig = chooseOne({ array: rowConfig, staticRandom: getStaticRandom({ req, res }) });
    }

    if (!rowConfig) {
        return res.json(null)
    }

    return res.json(await cleanAwaitJson(await processRow({ rowConfig, params: command.params, driver })))
}