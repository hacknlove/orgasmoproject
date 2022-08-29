import processRow from "../lib/processRow";
import chooseOne from "../lib/chooseOne";
import { cleanAwaitJson } from "../lib/cleanJson";
import getStaticRandom from "../lib/getStaticRandom";
import { serialize } from "../lib/serialization";
import parseCommand from "./parseCommand";
import { currentTimeChunk } from "../lib/timechunks";

export default async function getRow(ctx) {
    const { req, res, driver } = ctx
    const command = await parseCommand({ req, res, driver })
    if (!command) {
        return
    }

    const page = await driver.page.getPageFromId({ ...command })

    if (!page || !page.getRow || !driver[page.getRow]) {
        return res.json(null)
    }

    let rowConfig = await driver[page.getRow]({ ...command, number: parseInt(req.query.n) })

    if (Array.isArray(rowConfig)) {
        rowConfig = chooseOne({ array: rowConfig, ctx: { req, res } });
    }

    if (!rowConfig) {
        return res.json(null)
    }

    const row = await cleanAwaitJson(await processRow({ rowConfig, params: command.params, ctx }))

    if (row.props.getMore) {
        row.props.src = `/api/_ogm?c=${serialize({
            ...row.props.getMore,
            expire: currentTimeChunk().expire,
            roles: req.user.roles,
        })}`
        delete row.props.getMore
    }

    return res.json({
        row,
        src: `/api/_ogr?c=${serialize({
            ...command,
            expire: currentTimeChunk().expire,
            roles: req.user.roles,
        })}`
    })
}