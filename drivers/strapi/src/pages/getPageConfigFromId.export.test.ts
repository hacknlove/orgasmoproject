/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import getPageConfigFromId from "./getPageConfigFromId.export";
import strapiFetch from "../strapiFetch";
import mapStrapiToOrgasmo from "../mapStrapiToOrgasmo";

jest.mock("../mapStrapiToOrgasmo", () => ({
  __esModule: true,
  default: jest.fn((i) => i),
}));

jest.mock("../strapiFetch", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("getPageConfigFromId", () => {
  let ctx;
  beforeEach(() => {
    ctx = {
      resolvedUrl: "/foo/bar",
      events: {
        emit: jest.fn(),
      },
    };
  });
  it("returns the pageConfig if the path matches any key", async () => {
    strapiFetch.mockResolvedValue({ data: ["something"] });

    const response = await getPageConfigFromId(ctx);
    expect(response).toEqual("something");
  });
  it("emits and error if the endpoint errors", async () => {
    strapiFetch.mockResolvedValue({ error: "Some error" });

    await getPageConfigFromId("pageId", ctx);

    expect(ctx.events.emit).toBeCalledWith("error", {
      type: "driver",
      driver: process.env.ORGASMO_DRIVER,
      method: "page.getPageConfigFromId",
      error: "Some error",
    });
    expect(mapStrapiToOrgasmo).not.toBeCalled();
  });
});
