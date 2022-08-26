import { currentTimeChunk } from "./timechunks";

describe('currentTimeChunk', () => {
    it('returns the same start, renew and end for times in the same chunk', () => {
        jest.spyOn(Date, 'now').mockImplementation(() => 12345678)

        const chunks1 = currentTimeChunk({ cacheExpiration: 1000, cacheRenew: 500 })

        jest.spyOn(Date, 'now').mockImplementation(() => 12345600)
        const chunks2 = currentTimeChunk({ cacheExpiration: 1000, cacheRenew: 500 })

        jest.spyOn(Date, 'now').mockImplementation(() => 12345900)
        const chunks3 = currentTimeChunk({ cacheExpiration: 1000, cacheRenew: 500 })

        expect(chunks1).toEqual(chunks2)
        expect(chunks2).toEqual(chunks3)
    })
    it('returns different start, renew and end for times in different chunk', () => {
        jest.spyOn(Date, 'now').mockImplementation(() => 12345678)

        const chunks1 = currentTimeChunk({ cacheExpiration: 1000, cacheRenew: 500 })

        jest.spyOn(Date, 'now').mockImplementation(() => 2345600)
        const chunks2 = currentTimeChunk({ cacheExpiration: 1000, cacheRenew: 500 })

        expect(chunks1).not.toEqual(chunks2)
    })
    it('read environment', () => {
        process.env.CACHE_EXPIRATION = '1000'
        currentTimeChunk()
    })
})