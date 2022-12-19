/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import getItem, { getItemByNumber } from "./getItem";
import parseCommand from "./parseCommand";
import skipThisRow from "../lib/skipThisRow";

jest.mock("./parseCommand", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../lib/skipThisRow", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("getItem", () => {
  let ctx;
  beforeEach(() => {
    ctx = {
      req: {
        query: {
          n: 4,
        },
        user: {
          roles: [],
        },
      },
      res: {
        json: jest.fn(),
      },
      driver: {
        page: {
          getPageConfigFromId: jest.fn(),
        },
        "somePage.getItem": jest.fn(),
      },
    };
  });
  it("does nothing if there is no command", async () => {
    await getItem(ctx);
    (parseCommand as jest.Mock).mockReturnValue({});

    expect(ctx.res.json).toBeCalledWith(null);
  });

  it("calls driver.page.getPageConfigFromId to get the row", async () => {
    (parseCommand as jest.Mock).mockReturnValue({
      pageId: "getItem-test",
    });

    await getItem(ctx);

    expect(ctx.driver.page.getPageConfigFromId).toBeCalledWith(
      "getItem-test",
      ctx
    );
    expect(ctx.res.json).toBeCalledWith(null);
  });

  it("serializes props.getMore if defined", async () => {
    (parseCommand as jest.Mock).mockReturnValue({
      pageId: "getItem-test",
      area: "main",
    });

    ctx.driver.page.getPageConfigFromId.mockReturnValue({
      areas: {
        main: {
          getItem: "somePage.getItem",
        },
      },
    });
    ctx.driver["somePage.getItem"].mockReturnValue({
      type: "test-1",
      props: { getMore: { handler: "test" } },
    });

    await getItem(ctx);

    expect(ctx.res.json.mock.calls[0][0]).toEqual({
      row: {
        type: "test-1",
        props: {
          src: expect.any(String),
        },
      },
      src: expect.any(String),
    });
  });

  it("returns nothing if no configRow returned", async () => {
    ctx.driver.page.getPageConfigFromId.mockReturnValue({
      areas: {
        main: {
          getItem: "somePage.getItem",
        },
      },
    });

    await getItem(ctx);

    expect(ctx.res.json.mock.calls[0][0]).toBeNull();
  });

  it("returns from the page items if possible", async () => {
    (parseCommand as jest.Mock).mockReturnValue({
      pageId: "getItem-test",
      area: "main",
    });
    ctx.driver.page.getPageConfigFromId.mockReturnValue({
      areas: {
        main: {
          getItem: "somePage.getItem",
          items: [{}, {}, {}, {}, "this row"],
        },
      },
    });

    await getItem(ctx);
    expect(ctx.driver["somePage.getItem"]).not.toBeCalled();
  });

  it("gets a new item from the driver", async () => {
    (parseCommand as jest.Mock).mockReturnValue({
      pageId: "getItem-test",
      area: "main",
    });

    ctx.driver.page.getPageConfigFromId.mockReturnValue({
      areas: {
        main: {
          items: [{}, {}],
          getItem: "somePage.getItem",
        },
      },
    });

    await getItem(ctx);
    expect(ctx.driver["somePage.getItem"]).toBeCalled();
  });
  it("returns null if there is no area", async () => {
    (parseCommand as jest.Mock).mockReturnValue({
      pageId: "getItem-test",
      area: "otherArea",
    });

    ctx.driver.page.getPageConfigFromId.mockReturnValue({
      areas: {
        main: {
          items: [{}, {}],
          getItem: "somePage.getItem",
        },
      },
    });

    await getItem(ctx);
    expect(ctx.res.json.mock.calls[0][0]).toBeNull();
    expect(ctx.driver["somePage.getItem"]).not.toBeCalled();
  });

  it("skips the row", async () => {
    skipThisRow.mockReturnValueOnce(true);

    await getItemByNumber(ctx, {
      areaConfig: { items: Array.from({ length: 20 }, (v, i) => i) },
      command: {},
    });

    expect(skipThisRow).toBeCalledTimes(2);
  });

  it("extends context if rowConfig has getProps", async () => {
    await getItemByNumber(ctx, {
      areaConfig: {
        items: Array.from(
          { length: 20 },
          (v, i) =>
            i === 4 && {
              getProps: "some.function",
            }
        ),
      },
      pageConfig: {},
      command: {},
    });
  });
});
