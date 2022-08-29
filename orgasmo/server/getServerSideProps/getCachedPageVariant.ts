import chooseOne from '../lib/chooseOne';
import { cencode, decencode } from 'cencode'
import cacheGet from '../cache/cacheGet';
import getNewFullPage from './getNewFullPage';

export default async function getCachedPageVariant({ pageConfig, ctx, key }) {
    const pageId = chooseOne({ array: pageConfig.pages, ctx });
    const newKey = cencode({ ...decencode(key), pageId })
    
    const cachedVariant = await cacheGet({ driver: ctx.driver, cache: ctx.cache, key: newKey })

    if (!cachedVariant) {
        return getNewFullPage(ctx)
    }
}