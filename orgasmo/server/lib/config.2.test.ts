process.env.MAX_REWRITES = '1'
process.env.CACHE_EXPIRATION = '2'
process.env.CACHE_RENEW = '3'

import './config'

test('dummy', () => {
    expect(true).toBe(true)
})