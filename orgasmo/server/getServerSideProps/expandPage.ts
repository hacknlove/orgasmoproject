import { decencode } from 'cencode';
import chooseOne from '../lib/chooseOne';
import { cleanAwaitJson } from '../lib/cleanJson';
import { currentTimeChunk } from '../lib/timechunks';
import { serialize } from '../lib/serialization';
import getRows from './getRows';
import rewrite from './rewrite';

export default async function expandPage ({ ctx, driver, pageConfig, key, params = undefined }) {
  
  const page = pageConfig.page ?? chooseOne({ array: pageConfig.pages, ctx });
    
    if (page.redirect) {
        return {
          redirect: page.redirect
        }
    }

    if (page.rewrite) {
      return rewrite({ ctx, rewrite: page.rewrite, driver, key })
    }

    

    params = params || decencode(key)

    const timeChunk = currentTimeChunk(page.timeChunk)

    return cleanAwaitJson({
        props: {
            top: getRows({
              ctx,
              params,
              rows: page.top,
              driver,
              timeChunk,
            }),
            rows: getRows({
              ctx,
              params,
              rows: page.rows,
              driver,
              limit: page.rowsLimit,
              timeChunk,
            }),
            bottom: getRows({
              ctx,
              params,
              driver,
              rows: page.bottom,
              timeChunk,
            }),
            src: page.rowsLimit && `/api/_ogr?c=${serialize({
                pageId: page.id,
                params,
                roles: ctx.req.user.roles,
                expire: timeChunk.expire,
            })}`,
        }
      });
}