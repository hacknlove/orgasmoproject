import expandArea from "./area";

jest.mock("./getItems", () => ({
  __esModule: true,
  default: jest.fn(() => "getItems response"),
}));

describe("area", () => {
  const name = "SomeAreaName";
  const pageId = "SomePageId";
  const params = {};

  let areaConfig;
  let ctx;
  let timeChunk;

  beforeEach(() => {
    areaConfig = {};
    ctx = {
      req: {
        user: {
          roles: ["test role"],
        },
      },
    };
    timeChunk = {
      expire: 123,
    };
  });
  it("adds a src to get more items, if there is ssrSize and mode is bubble", async () => {
    areaConfig.mode = "bubble";
    areaConfig.getItem = "some.driver.method";
    expect(
      await expandArea({ ctx, name, pageId, params, areaConfig, timeChunk })
    ).toEqual({
      items: "getItems response",
      mode: "bubble",
      src: expect.any(String),
    });
  });
  it("adds a src to get more items, if there is ssrSize and mode is grow", async () => {
    areaConfig.mode = "grow";
    areaConfig.getItem = "some.driver.method";
    expect(
      await expandArea({ ctx, name, pageId, params, areaConfig, timeChunk })
    ).toEqual({
      items: "getItems response",
      mode: "grow",
      src: expect.any(String),
    });
  });
});
