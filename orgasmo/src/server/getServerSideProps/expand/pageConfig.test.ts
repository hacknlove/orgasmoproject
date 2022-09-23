/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import expandPage from "./expandPage";
import rewrite from "../rewrite";

jest.mock("./getItems", () => ({
  __esModule: true,
  default: jest.fn(() => "getItemsResponse"),
}));

jest.mock("./rewrite", () => ({
  __esModule: true,
  default: jest.fn(() => "rewrite response"),
}));

describe("expandPage", () => {
  let ctx;
  let pageConfig;
  let key;
  beforeEach(() => {
    ctx = {
      driver: {},
      req: {
        user: {
          roles: ["test-role"],
        },
      },
    };
    pageConfig = {};
    key = "(Mparams_Jfoo.Lroles_Ptest-role";
  });
  it("redirects if page.redirect", async () => {
    pageConfig.redirect = "Somewhere";
    expect(await expandPage({ pageConfig })).toEqual({ redirect: "Somewhere" });
  });
  it("rewrites if page.rewrite", async () => {
    pageConfig.rewrite = "Somewhere";

    expect(await expandPage({ ctx, pageConfig, key })).toBe("rewrite response");
    expect(rewrite).toBeCalledWith({ ctx, rewrite: "Somewhere", key });
  });
  it("decode the key, if params is not passed", async () => {
    pageConfig = {};
    expect(await expandPage({ ctx, pageConfig, key })).toEqual({
      props: {
        footer: "getItemsResponse",
        main: "getItemsResponse",
        header: "getItemsResponse",
      },
    });
  });
  it("adds a src to get more items, if there is mainSsrSize", async () => {
    pageConfig = { mainSsrSize: 14 };
    expect(await expandPage({ ctx, pageConfig, key })).toEqual({
      props: {
        footer: "getItemsResponse",
        main: "getItemsResponse",
        src: expect.any(String),
        header: "getItemsResponse",
      },
    });
  });
  it("transform the cssVars into something you can pass to style props", async () => {
    pageConfig = {
      cssVars: {
        someVar: "someValue",
        someOtherVar: "someOtherValue",
      },
    };
    expect(await expandPage({ ctx, pageConfig, key })).toEqual({
      props: {
        footer: "getItemsResponse",
        main: "getItemsResponse",
        header: "getItemsResponse",
        cssVars: {
          "--someVar": "someValue",
          "--someOtherVar": "someOtherValue",
        },
      },
    });
  });
});