import getRow from "./getRow";
import parseCommand from "./parseCommand";

jest.mock("./parseCommand", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const res = {
  json: jest.fn(),
};

describe("getRow", () => {
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
          getPageFromId: jest.fn(),
        },
        "somePage.getRow": jest.fn(),
      },
    };
  });
  it("does nothing if there is no command", async () => {
    await getRow(ctx);
    (parseCommand as jest.Mock).mockReturnValue({});

    expect(ctx.res.json).toBeCalledWith(null);
  });

  it("calls driver.page.getPageFromId to get the row", async () => {
    (parseCommand as jest.Mock).mockReturnValue({ pageId: "getRow-test" });

    await getRow(ctx);

    expect(ctx.driver.page.getPageFromId).toBeCalledWith({
      pageId: "getRow-test",
    });
    expect(ctx.res.json).toBeCalledWith(null);
  });

  it("serializes props.getMore if defined", async () => {
    ctx.driver.page.getPageFromId.mockReturnValue({
      getRow: "somePage.getRow",
    });
    ctx.driver["somePage.getRow"].mockReturnValue({
      type: "test-1",
      props: { getMore: { handler: "test" } },
    });

    await getRow(ctx);

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
    ctx.driver.page.getPageFromId.mockReturnValue({
      getRow: "somePage.getRow",
    });

    await getRow(ctx);

    expect(ctx.res.json.mock.calls[0][0]).toBeNull();
  });

  it("returns from the page rows if possible", async () => {
    ctx.driver.page.getPageFromId.mockReturnValue({
      getRow: "somePage.getRow",
      rows: [{}, {}, {}, {}, "this row"],
    });

    await getRow(ctx);
    expect(ctx.driver["somePage.getRow"]).not.toBeCalled();
  });

  it("returns from the page rows if possible", async () => {
    ctx.driver.page.getPageFromId.mockReturnValue({
      getRow: "somePage.getRow",
      rows: [{}, {}],
    });

    await getRow(ctx);
    expect(ctx.driver["somePage.getRow"]).toBeCalled();
  });
});
