export const MAX_REWRITES = process.env.MAX_REWRITES
  ? parseInt(process.env.MAX_REWRITES)
  : 5;

export const CACHE_EXPIRATION = process.env.CACHE_EXPIRATION
  ? parseInt(process.env.CACHE_EXPIRATION)
  : 1000 * 60 * 60;
export const CACHE_RENEW = process.env.CACHE_RENEW
  ? parseInt(process.env.CACHE_RENEW)
  : CACHE_EXPIRATION / 2;
