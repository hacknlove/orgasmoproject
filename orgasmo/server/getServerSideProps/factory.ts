import chooseOne from '../lib/chooseOne';
import { withCleanJson } from '../lib/cleanJson';
import getRows from "./getRows";
import { serialize } from '../lib/serialization';
import getStaticRandom from '../lib/getStaticRandom';
import setCookies from '../lib/setCookies';

export default function getServerSidePropsFactory ({ driver }) {
  return withCleanJson(async (ctx) => {
    const user = ctx.req.user = await driver.user.getUser(ctx);

    let page = ctx.res.page = await driver.page.getPage(ctx);

    if (!page) {
      return {
        notFound: true
      }
    }

    const staticRandom = ctx.staticRandom = getStaticRandom(ctx);

    if (Array.isArray(page)) {
      page = chooseOne({ array: page, staticRandom });
    }

    if (page.redirect) {
      return {
        redirect: page.redirect
      }
    }

    const params = page.getParams ? await driver[page.getParams](ctx) : null

    setCookies({ ctx, cookies: page.cookies });
    
    return {
      props: {
          top: getRows({
            ctx,
            params,
            rows: page.top,
            driver,
          }),
          rows: getRows({
            ctx,
            params,
            rows: page.rows,
            driver,
            limit: page.rowsLimit
          }),
          bottom: getRows({
            ctx,
            params,
            driver,
            rows: page.bottom
          }),
          src: page.rowsLimit && `/api/_ogr?c=${serialize({
              pageId: page.id,
              params,
              userId: user.id,
              expire: Date.now() + 86400000, // 1 day in ms = 24 * 60 * 60 * 1000 = 86400000
          })}`,
      }
    }
  })
}
