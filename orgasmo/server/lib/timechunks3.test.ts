process.env.CACHE_RENEW = '1000'

import { currentTimeChunk } from "./timechunks";

describe('currentTimeChunk', () => {
    it('read environment', () => {
        currentTimeChunk()
    })
})