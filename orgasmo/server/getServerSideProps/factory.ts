import type { FactoryParameters } from '../../types';
import type { GetServerSideProps } from 'next';

import chooseOne from '../lib/chooseOne';
import { withCleanJson } from '../lib/cleanJson';
import getRows from "./getRows";
import { serialize } from '../lib/serialization';
import getStaticRandom from '../lib/getStaticRandom';
import setCookies from '../lib/setCookies';

import { currentTimeChunk } from '../lib/timechunks';
import { cachedPage } from './cache';

export default function getServerSidePropsFactory ({ driver }: FactoryParameters): GetServerSideProps {
  return withCleanJson(async (ctx) => {
    ctx.driver = driver
    const user = ctx.req.user = await driver.user.getUser(ctx);

    const pageConfig = await cachedPage({ driver, ctx });

    if (!pageConfig) {
      return {
        notFound: true
      }
    }

    const staticRandom = ctx.staticRandom = getStaticRandom(ctx);

    const page = pageConfig.page ?? chooseOne({ array: pageConfig.pages, staticRandom });

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
              roles: user.roles,
              expire: currentTimeChunk().end,
          })}`,
      }
    }
  })
}
