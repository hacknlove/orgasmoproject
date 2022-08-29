import chooseOne from '../lib/chooseOne';
import { cencode, decencode } from 'cencode'
import cacheGet from '../cache/cacheGet';
import { getNewFullPage } from './getNewFullPage';

export default async function getCachedPageVariant({ cache, cached, driver, ctx, key }) {
    const pageId = chooseOne({ array: cached.pages, ctx });
    const newKey = cencode({ ...decencode(key), pageId })
    
    const cachedVariant = await cacheGet({ driver, cache, key: newKey })

    if (!cachedVariant) {
        return getNewFullPage({ ctx, driver, cache })
    }
}