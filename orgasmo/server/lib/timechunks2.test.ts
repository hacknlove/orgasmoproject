process.env.CACHE_EXPIRATION = '1000'

import { currentTimeChunk } from "./timechunks";

describe('currentTimeChunk', () => {
    it('read environment', () => {
        process.env.CACHE_EXPIRATION = '1000'
        currentTimeChunk()
    })
})