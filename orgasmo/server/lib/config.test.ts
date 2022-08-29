process.env.MAX_REWRITES = undefined;
process.env.CACHE_EXPIRATION = undefined;
process.env.CACHE_RENEW = undefined;

import "./config";

test("dummy", () => {
  expect(true).toBe(true);
});
