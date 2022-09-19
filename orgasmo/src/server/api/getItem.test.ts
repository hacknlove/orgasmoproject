/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import getItem from "./getItem";
import parseCommand from "./parseCommand";

jest.mock("./parseCommand", () => ({
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
        "somePage.getItemConfig": jest.fn(),
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
      pageId: "getItemConfig-test",
    });

    await getItem(ctx);

    expect(ctx.driver.page.getPageConfigFromId).toBeCalledWith(
      "getItemConfig-test", ctx
    );
    expect(ctx.res.json).toBeCalledWith(null);
  });

  it("serializes props.getMore if defined", async () => {
    ctx.driver.page.getPageConfigFromId.mockReturnValue({
      getItemConfig: "somePage.getItemConfig",
    });
    ctx.driver["somePage.getItemConfig"].mockReturnValue({
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
      getItemConfig: "somePage.getItemConfig",
    });

    await getItem(ctx);

    expect(ctx.res.json.mock.calls[0][0]).toBeNull();
  });

  it("returns from the page items if possible", async () => {
    ctx.driver.page.getPageConfigFromId.mockReturnValue({
      getItemConfig: "somePage.getItemConfig",
      main: [{}, {}, {}, {}, "this row"],
    });

    await getItem(ctx);
    expect(ctx.driver["somePage.getItemConfig"]).not.toBeCalled();
  });

  it("returns from the page items if possible", async () => {
    ctx.driver.page.getPageConfigFromId.mockReturnValue({
      getItemConfig: "somePage.getItemConfig",
      main: [{}, {}],
    });

    await getItem(ctx);
    expect(ctx.driver["somePage.getItemConfig"]).toBeCalled();
  });
});
