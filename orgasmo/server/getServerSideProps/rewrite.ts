import { MAX_REWRITES } from '../lib/config';
import events from '../events';
import getPage from './getPage';

export default function rewrite({ ctx, rewrite, key }) {
    if (!ctx.original) {
        ctx.original = {
          roles: ctx.req.roles,
          params: ctx.params,
          query: ctx.query,
          key
        }
      }

      if (ctx.rewrites > MAX_REWRITES) {
        events.emit('MAX_REWRITES', { original: ctx.original, ctx, rewrite: rewrite })
        return {
          notFound: true
        }
      }

      let change
      if (rewrite.roles) {
        ctx.roles = rewrite.roles
        change = true
      }
      if(rewrite.params) {
        ctx.params = rewrite.params
        change = true
      }
      if(rewrite.query) {
        ctx.params = rewrite.params
        change = true
      }

      if (!change) {
        events.emit('REWRITE_TO_ITSELF', { original: ctx.original, ctx, rewrite: rewrite })
      }

      return getPage(ctx)
}