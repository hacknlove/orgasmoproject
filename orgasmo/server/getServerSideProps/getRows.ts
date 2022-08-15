
import processRow from "../lib/processRow";
import chooseOne from "../lib/chooseOne";
import { serialize } from "../lib/serialization";
import setCookies from "../lib/setCookies";

export default async function getRows({ rows: rowsProp, params, ctx, driver, limit = Infinity }) {
    const rows = [];

    if (!rowsProp) {
        return [];
    }

    for (let rowConfig of rowsProp) {
        if (Array.isArray(rowConfig)) {
            rowConfig = chooseOne({ array: rowConfig, staticRandom: ctx.staticRandom });
        }
        setCookies({ ctx, cookies: rowConfig.cookies });

        const row = await processRow({ rowConfig, params, driver })
        if (row?.props?.getMore) {
            row.props.getMore = serialize({
                getMore: row.props.getMore,
                expire: Date.now() + 3600000,
                userId: ctx.req.user?.id,
            })
        }
        
        // @ts-ignore
        rows.push(row);
        if (!--limit) {
            break;
        }
    }

    return rows;
}
