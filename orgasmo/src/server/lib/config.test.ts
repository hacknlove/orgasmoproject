/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
process.env.MAX_REWRITES = undefined;
process.env.CACHE_EXPIRATION = undefined;
process.env.CACHE_RENEW = undefined;

import "./config";

test("dummy", () => {
  expect(true).toBe(true);
});
