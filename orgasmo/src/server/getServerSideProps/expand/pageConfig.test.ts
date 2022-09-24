/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import { decencode } from "cencode";
import expandPage from "./pageConfig";
import rewrite from "./rewrite";

jest.mock("./getItems", () => ({
  __esModule: true,
  default: jest.fn(() => "getItemsResponse"),
}));

jest.mock("./rewrite", () => ({
  __esModule: true,
  default: jest.fn(() => "rewrite response"),
}));

jest.mock("cencode", () => ({
  decencode: jest.fn(() => ({})),
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
    pageConfig.flowControl = { redirect: "Somewhere" };
    expect(await expandPage({ pageConfig })).toEqual({ redirect: "Somewhere" });
  });
  it("rewrites if page.rewrite", async () => {
    pageConfig.flowControl = { rewrite: "Somewhere" };

    expect(await expandPage({ ctx, pageConfig, key })).toBe("rewrite response");
    expect(rewrite).toBeCalledWith({ ctx, rewrite: "Somewhere", key });
  });
  it("decode the key, if params is not passed", async () => {
    pageConfig = {};
    await expandPage({ ctx, pageConfig, key });
    expect(decencode).toBeCalled();
  });
  it("transform the cssVars into something you can pass to style props", async () => {
    pageConfig = {
      layout: {
        cssVars: {
          someVar: "someValue",
          someOtherVar: "someOtherValue",
        },
      },
    };
    expect(await expandPage({ ctx, pageConfig, key })).toEqual({
      props: {
        areas: {},
        layout: {
          cssVars: {
            "--someVar": "someValue",
            "--someOtherVar": "someOtherValue",
          },
          meta: {},
        },
      },
    });
  });
  it("expands flowControl if getFlowControl", async () => {
    pageConfig.getFlowControl = "some.method";
    ctx.driver["some.method"] = () => ({ redirect: "somewhere" });

    expect(await expandPage({ ctx, pageConfig, key })).toEqual({
      redirect: "somewhere",
    });
  });
});
