/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import getPageConfig from "./getPageConfig";
import strapiFetch from './strapiFetch';
import mapStrapiToOrgasmo from "./mapStrapiToOrgasmo";

jest.mock("./mapStrapiToOrgasmo", () => ({
  __esModule: true,
  default: jest.fn(i => i)
}));



jest.mock("./strapiFetch", () => ({
  __esModule: true,
  default: jest.fn()
}));

describe("getPageConfig", () => {
  let ctx;
  beforeEach(() => {
    ctx = {
      resolvedUrl: "/foo/bar",
      events: {
        emit: jest.fn()
      }
    };
  });
  it("returns undefined if no page matches", async () => {
    strapiFetch.mockResolvedValue({ data: [] })

    expect(await getPageConfig(ctx)).toBeUndefined();
    expect(mapStrapiToOrgasmo).not.toBeCalled()
  });
  it("returns the pageConfig if the path matches any key", async () => {
    strapiFetch.mockResolvedValue({ data: ["something"] })
    
    const response = await getPageConfig(ctx)
    expect(response).toEqual("something")
  });
  it('emits and error if the endpoint errors', async () => {
    strapiFetch.mockResolvedValue({ error: 'Some error' })

    await getPageConfig(ctx)

    expect(ctx.events.emit).toBeCalledWith('error', {
      type: "driver",
      driver: process.env.ORGASMO_DRIVER,
      method: "page.getPageConfig",
      error: "Some error"
    })
    expect(mapStrapiToOrgasmo).not.toBeCalled()
  })
  it('returns an array if multiple pageConfis match the staticPath', async () => {
    strapiFetch.mockResolvedValue({ data: ["someStaticPathPageConfig", "someOther"] })
    expect(await getPageConfig(ctx)).toEqual(["someStaticPathPageConfig", "someOther"]);

  })
  it('returns an array if multiple pageConfis match the staticPath', async () => {
    strapiFetch.mockReturnValueOnce({ data: [] })

    strapiFetch.mockResolvedValue({ data: [
      { attributes: { dynamicPath: "/not/:this" } },
      { attributes: { dynamicPath: "/foo/:bar" } },
      { attributes: { dynamicPath: "/foo/fuu" } },
      { attributes: { dynamicPath: "/:foo/fuu" } }
    ] })
    expect(await getPageConfig(ctx)).toEqual({ attributes: { dynamicPath: "/foo/:bar" } });
  })
  it("returns an array if there are multiple matches for the same pattern", async () => {
    strapiFetch.mockReturnValueOnce({ data: [] })
    strapiFetch.mockReturnValue({ data: [
      { attributes: { dynamicPath: "/not/:this" } },
      { attributes: { dynamicPath: "/foo/:bar", foo: 'foo' } },
      { attributes: { dynamicPath: "/foo/fuu" } },
      { attributes: { dynamicPath: "/:foo/fuu" } },
      { attributes: { dynamicPath: "/foo/:bar", bar: 'bar' } },
      { attributes: { dynamicPath: "/foo/:bar", buz: 'buz' } },
    ]});
    expect(await getPageConfig(ctx)).toEqual([
      { attributes: { dynamicPath: "/foo/:bar", foo: 'foo' } },
      { attributes: { dynamicPath: "/foo/:bar", bar: 'bar' } },
      { attributes: { dynamicPath: "/foo/:bar", buz: 'buz' } },
    ]);
  });
  it('emits and error if the endpoint for dynamicPaths errors', async () => {
    strapiFetch.mockReturnValueOnce({ data: [] })
    strapiFetch.mockResolvedValue({ error: 'Some error' })

    await getPageConfig(ctx)

    expect(ctx.events.emit).toBeCalledWith('error', {
      type: "driver",
      driver: process.env.ORGASMO_DRIVER,
      method: "page.getPageConfig",
      error: "Some error"
    })
    expect(mapStrapiToOrgasmo).not.toBeCalled()
  })
});
