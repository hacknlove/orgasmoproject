import getCachedPage from './getCachedPage'

import cacheGet from "../cache/cacheGet"
import getPageCacheKeys from "./getPageCacheKeys"

jest.mock('../cache/cacheGet', () => ({
    __esModule: true,
    default: jest.fn()
}))
jest.mock('./getPageCacheKeys', () => ({
    __esModule: true,
    default: jest.fn()
}))

describe('detCachedPage', () => {
    let ctx
    it('gets the keys async generator from getPageCacheKeys', async () => {

    })
})