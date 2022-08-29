import cacheControl from "./cacheControl";

describe("cacheContro", () => {
  const ctx = {
    res: {
      setHeader: jest.fn(),
    },
  };
  it("does nothing if item has no timeChunk", () => {
    cacheControl({ ctx, item: {} });
    expect(ctx.res.setHeader).not.toBeCalled();
  });
  it("set CacheControl headers if item has timeChunk", () => {
    cacheControl({ ctx, item: { timeChunk: {} } });
    expect(ctx.res.setHeader).toBeCalled();
  });
});
