const defaultCacheExpiration = process.env.CACHE_EXPIRATION ? parseInt(process.env.CACHE_EXPIRATION) : 1000 * 60 * 60 
const defaultCacheRenew = process.env.CACHE_RENEW ? parseInt(process.env.CACHE_RENEW) : defaultCacheExpiration / 2

export interface currentChunkParameters {
    cacheExpiration?: number,
    cacheRenew?: number 
}

export interface currentChunkReturn {
    start: number,
    renew: number,
    end: number
}

export function currentTimeChunk(parameters: currentChunkParameters): currentChunkReturn;
export function currentTimeChunk(): currentChunkReturn;
export function currentTimeChunk({ cacheExpiration = defaultCacheExpiration, cacheRenew = defaultCacheRenew } = {}): currentChunkReturn {
    const now = Date.now()
    const start = now - now % cacheRenew
    const renew = start + cacheRenew
    const end = start + cacheExpiration

    return { start, renew, end }
}
