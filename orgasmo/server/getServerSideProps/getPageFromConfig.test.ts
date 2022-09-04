/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import getPageFromConfig from "./getPageFromConfig";
import events from "../events";
import chooseOne from "../lib/chooseOne";

jest.mock("../lib/chooseOne", () => ({
  __esModule: true,
  default: jest.fn((array) => array[0]),
}));

jest.mock("../events", () => ({
  __esModule: true,
  default: {
    emit: jest.fn(),
  },
}));

describe("getPageFromConfig", () => {
  let ctx;
  beforeEach(() => {
    ctx = {
      params: {},
      setCookies: [],
      req: {
        user: {
          roles: ["test-roles"],
        },
      },
      driver: {
        page: {
          getPageConfig: jest.fn(),
        },
        someGetParams: jest.fn(),
      },
      res: {
        setHeader: jest.fn(),
      },
      cache: new Map(),
    };
  });
  it("returns null if getPageConfig returns falsy", async () => {
    const response = await getPageFromConfig(ctx);

    expect(response).toBeNull();
  });
  it("returns null and emits error if driver.getPageConfig fails", async () => {
    ctx.driver.page.getPageConfig.mockRejectedValue("some error");

    const response = await getPageFromConfig(ctx);

    expect(response).toBeNull();
    expect(events.emit).toBeCalled();
  });
  it("returns null and emits error if the driver fails to get the pageParams", async () => {
    ctx.driver.page.getPageConfig.mockResolvedValue({
      getParams: "someGetParams",
    });
    ctx.driver.someGetParams.mockRejectedValue("some error");

    const response = await getPageFromConfig(ctx);

    expect(response).toBeNull();
    expect(events.emit).toBeCalled();
  });

  it("chooses one page, if there are more than one", async () => {
    ctx.driver.page.getPageConfig.mockResolvedValue([{ id: 1 }, { id: 2 }]);

    chooseOne.mockImplementation(({ array }) => array[0]);
    await getPageFromConfig(ctx);

    expect(chooseOne).toBeCalled();
  });

  it("use the default params if getParams returns falsy", async () => {
    ctx.driver.page.getPageConfig.mockResolvedValue({
      timeChunk: {},
      getParams: "someGetParams",
    });
    ctx.driver.someGetParams.mockResolvedValue(false);
    await getPageFromConfig(ctx);
  });
});
