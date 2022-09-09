/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import cacheControl from "./cacheControl";

describe("cacheContro", () => {
  let ctx;
  let item;
  beforeEach(() => {
    ctx = {
      res: {
        setHeader: jest.fn(),
      },
    };
    item = {};
  });
  it("does nothing if item has no timeChunk", () => {
    cacheControl({ ctx, item });
    expect(ctx.res.setHeader).not.toBeCalled();
  });
  it("set public CacheControl headers if item has timeChunk", () => {
    item.timeChunk = {
      revalidate: 60000,
      expire: 120000,
    };
    cacheControl({ ctx, item });
    expect(ctx.res.setHeader).toBeCalledWith(
      "Cache-Control",
      "public, s-maxage=60, immutable, must-revalidate, stale-while-revalidate=60, stale-if-error=120"
    );
  });
  it("set private CacheControl headers if item has timeChunk and private", () => {
    item.timeChunk = {
      revalidate: 60000,
      expire: 120000,
    };
    item.private = true;
    cacheControl({ ctx, item });
    expect(ctx.res.setHeader).toBeCalledWith(
      "Cache-Control",
      "private, s-maxage=60, immutable, must-revalidate, stale-while-revalidate=60, stale-if-error=120"
    );
  });
});
