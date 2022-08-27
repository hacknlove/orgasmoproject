
import processRow from "../lib/processRow";
import chooseOne from "../lib/chooseOne";
import { serialize } from "../lib/serialization";
import { maxTimeChunk } from "../lib/timechunks";

export default async function getRows({ rows: rowsProp, params, ctx, driver, limit = Infinity, timeChunk }) {
    if (!rowsProp) {
        return [];
    }

    const rows = [];

    for (let rowConfig of rowsProp) {
        if (Array.isArray(rowConfig)) {
            rowConfig = chooseOne({ array: rowConfig, ctx });
        }
        if (Array.isArray(rowConfig.cookies)) {
            ctx.setCookies.push(...rowConfig.cookies)
        } else if (rowConfig.cookies) {
            ctx.setCookies.push(rowConfig.cookies)
        }

        const rowTimeChunk = maxTimeChunk({ timeChunkConf: rowConfig.timeChunk, timeChunk })

        const row = await processRow({ rowConfig, params, driver })
        if (row?.props?.getMore) {
            row.props.src = `/api/_ogm?c=${serialize({
                ...row.props.getMore,
                roles: ctx.req.user.roles,
                expire: rowTimeChunk.expire,
            })}`
            delete row.props.getMore
        }
        
        // @ts-ignore
        rows.push(row);
        if (!--limit) {
            break;
        }
    }

    return rows;
}
