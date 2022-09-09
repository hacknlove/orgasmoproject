import { CACHE_EXPIRATION, CACHE_RENEW } from "./config";

export interface currentChunkParameters {
  cacheExpiration?: number;
  cacheRenew?: number;
}

export interface currentChunkReturn {
  revalidate: number;
  expire: number;
}

export function currentTimeChunk(
  parameters: currentChunkParameters
): currentChunkReturn;
export function currentTimeChunk(): currentChunkReturn;
export function currentTimeChunk({
  cacheExpiration = CACHE_EXPIRATION,
  cacheRenew = CACHE_RENEW,
} = {}): currentChunkReturn {
  const now = Date.now();
  const start = now - (now % cacheRenew);
  const revalidate = start + cacheRenew;
  const expire = start + cacheExpiration;

  return { revalidate, expire };
}

interface maxTimeChunkParameters {
  timeChunkConf?: currentChunkParameters;
  timeChunk: currentChunkReturn;
}

export function maxTimeChunk({
  timeChunkConf,
  timeChunk,
}: maxTimeChunkParameters): currentChunkReturn {
  if (!timeChunkConf) {
    return timeChunk;
  }

  const cacheRenew = timeChunkConf.cacheRenew ?? CACHE_RENEW;
  const cacheExpiration = timeChunkConf.cacheExpiration ?? CACHE_EXPIRATION;

  const now = Date.now();
  const start = now - (now % cacheRenew);
  const revalidate = Math.max(timeChunk.revalidate, start + cacheRenew);
  const expire = Math.max(timeChunk.expire, start + cacheExpiration);

  return { revalidate, expire };
}
