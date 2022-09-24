/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import rewriteFn from "./rewrite";
import { MAX_REWRITES } from "../../lib/config";
import events from "../../events";

jest.mock("../getPage", () => ({
  __esModule: true,
  default: jest.fn(() => "getPageResponse"),
}));

jest.mock("../../events", () => ({
  __esModule: true,
  default: {
    emit: jest.fn(),
  },
}));

describe("rewrite", () => {
  let ctx;
  let rewrite;
  let key;
  beforeEach(() => {
    key = expect.getState().currentTestName;
    ctx = {
      req: {
        user: {
          roles: ["test-role"],
        },
      },
      params: {},
      query: {},
    };
    rewrite = {};
  });
  it("sets ctx.original if no original", () => {
    expect(rewriteFn({ ctx, rewrite, key })).toBe("getPageResponse");

    expect(ctx.original).toEqual({
      roles: ctx.req.user.roles,
      params: ctx.params,
      query: ctx.query,
      key,
    });
  });
  it("increases the ctx.rewrites", () => {
    ctx.rewrites = 3;
    expect(rewriteFn({ ctx, rewrite, key })).toBe("getPageResponse");

    expect(ctx.rewrites).toBe(4);
  });
  it("returns not found and emits MAX_REWRITES if it rewrites more than n times", () => {
    ctx.rewrites = MAX_REWRITES;

    expect(rewriteFn({ ctx, rewrite, key })).toEqual({
      notFound: true,
    });

    expect(events.emit.mock.calls[0][0]).toBe("MAX_REWRITES");
  });
});
