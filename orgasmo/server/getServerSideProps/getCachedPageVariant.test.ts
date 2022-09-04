/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import getCachedPageVariant from "./getCachedPageVariant";
import { cencode, decencode } from "cencode";
import events from "../events";

jest.mock("./getPageFromConfig", () => ({
  __esModule: true,
  default: jest.fn(() => "getNewFullPageResponse"),
}));
jest.mock("./sendFullPage", () => ({
  __esModule: true,
  default: jest.fn(() => "sendFullPageResponse"),
}));
jest.mock("../events", () => ({
  __esModule: true,
  default: {
    emit: jest.fn(),
  },
}));

describe("getCachedPageVariant", () => {
  let pageIds;
  let ctx;
  let key;

  beforeEach(() => {
    pageIds = ["foo", "bar"];
    key = "(Mparams_Jfoo.Lroles_Ptest-role";
    ctx = {
      cache: new Map(),
      req: {
        user: {},
      },
    };
  });
  it("returns a new full page if the variant is not cached", async () => {
    expect(await getCachedPageVariant({ pageIds, ctx, key })).toBe(
      "getNewFullPageResponse"
    );
  });

  it("returns the sendFullPage if the variant is cached", async () => {
    ctx.req.user.staticRandom = 0;
    ctx.cache.set(
      cencode({
        ...decencode(key),
        pageId: "foo",
      }),
      {
        timeChunk: {},
        response: "Something",
      }
    );

    expect(await getCachedPageVariant({ pageIds, ctx, key })).toBe(
      "sendFullPageResponse"
    );
  });

  it("returns not found and emits an error if the cache is corrupted", async () => {
    ctx.req.user.staticRandom = 0;
    ctx.cache.set(
      cencode({
        ...decencode(key),
        pageId: "foo",
      }),
      {
        timeChunk: {},
      }
    );

    expect(await getCachedPageVariant({ pageIds, ctx, key })).toEqual({
      notFound: true,
    });
    expect(events.emit).toBeCalled();
  });
});
