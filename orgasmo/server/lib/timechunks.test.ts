import { currentTimeChunk, maxTimeChunk } from "./timechunks";

jest.mock("./config", () => ({
  __esModule: true,
  CACHE_EXPIRATION: 1000,
  CACHE_RENEW: 500,
}));
describe("currentTimeChunk", () => {
  it("returns the same start, renew and end for times in the same chunk", () => {
    jest.spyOn(Date, "now").mockImplementation(() => 12345678);

    const chunks1 = currentTimeChunk({
      cacheExpiration: 1000,
      cacheRenew: 500,
    });

    jest.spyOn(Date, "now").mockImplementation(() => 12345600);
    const chunks2 = currentTimeChunk();

    jest.spyOn(Date, "now").mockImplementation(() => 12345900);
    const chunks3 = currentTimeChunk({
      cacheExpiration: 1000,
      cacheRenew: 500,
    });

    expect(chunks1).toEqual(chunks2);
    expect(chunks2).toEqual(chunks3);
  });
  it("returns different start, renew and end for times in different chunk", () => {
    jest.spyOn(Date, "now").mockImplementation(() => 12345678);

    const chunks1 = currentTimeChunk({
      cacheExpiration: 1000,
      cacheRenew: 500,
    });

    jest.spyOn(Date, "now").mockImplementation(() => 2345600);
    const chunks2 = currentTimeChunk({
      cacheExpiration: 1000,
      cacheRenew: 500,
    });

    expect(chunks1).not.toEqual(chunks2);
  });
});

describe("maxTimeChunk", () => {
  it("returns the max revalidate and expire", () => {
    jest.spyOn(Date, "now").mockImplementation(() => 12345678);

    const chunks1 = currentTimeChunk({
      cacheExpiration: 1000,
      cacheRenew: 500,
    });

    const chunks2 = currentTimeChunk({
      cacheExpiration: 100,
      cacheRenew: 1000,
    });

    const chunks3 = maxTimeChunk({
      timeChunkConf: { cacheExpiration: 100, cacheRenew: 1000 },
      timeChunk: chunks1,
    });
    maxTimeChunk({ timeChunkConf: { cacheRenew: 1000 }, timeChunk: chunks1 });
    maxTimeChunk({
      timeChunkConf: { cacheExpiration: 1000 },
      timeChunk: chunks1,
    });

    expect(chunks3.revalidate).toBeGreaterThanOrEqual(chunks1.revalidate);
    expect(chunks3.revalidate).toBeGreaterThanOrEqual(chunks2.revalidate);
    expect(chunks3.expire).toBeGreaterThanOrEqual(chunks1.expire);
    expect(chunks3.expire).toBeGreaterThanOrEqual(chunks2.expire);
  });
  it("returns timeChunk if no conf passed", () => {
    expect(maxTimeChunk({ timeChunk: { revalidate: 1, expire: 1 } })).toEqual({
      revalidate: 1,
      expire: 1,
    });
  });
});
