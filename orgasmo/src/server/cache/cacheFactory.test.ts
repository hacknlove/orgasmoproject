/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import cacheFactory from "./cacheFactory";
import events from "../events";

jest.mock("../events", () => ({
  __esModule: true,
  default: {
    emit: jest.fn(),
  },
}));

describe("cacheFactory", () => {
  let ctx;
  beforeEach(() => {
    ctx = {
      driver: {
        cache: {
          factory: jest.fn(),
        },
      },
    };
  });
  it("gets the cache from the driver and set it to the context", async () => {
    ctx.driver.cache.factory = () => "Cache from the driver";
    await cacheFactory(ctx);

    expect(ctx.cache).toBe("Cache from the driver");
  });
  it("sets the default cache to the context, if the driver returns no cache", async () => {
    ctx.driver.cache.factory = () => null;
    await cacheFactory(ctx);

    expect(ctx.cache).toBeInstanceOf(Map);
  });
  it("sets the default cache to the context, if the driver has no cache factory", async () => {
    ctx.driver = {};
    await cacheFactory(ctx);

    expect(ctx.cache).toBeInstanceOf(Map);
  });
  it("triggers error event if factory errors, and fallbacks to defauls", async () => {
    ctx.driver.cache.factory = () => Promise.reject("The error");

    await cacheFactory(ctx);

    expect(ctx.cache).toBeInstanceOf(Map);
    expect(events.emit).toBeCalled();
  });
  it("does nothing if the context has already cache", async () => {
    ctx.cache = "some cache";

    await cacheFactory(ctx);
    expect(ctx.cache).toBe("some cache");
    expect(ctx.driver.cache.factory).not.toBeCalled();
  });
});
