/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import getNewFullPage from "./getNewFullPage";
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

describe("getNewFullPage", () => {
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
          getPage: jest.fn(),
        },
        someGetParams: jest.fn(),
      },
    };
  });
  it("returns null if getPage returns falsy", async () => {
    const response = await getNewFullPage(ctx);

    expect(response).toBeNull();
  });
  it("returns null and emits error if driver.getPage fails", async () => {
    ctx.driver.page.getPage.mockRejectedValue("some error");

    const response = await getNewFullPage(ctx);

    expect(response).toBeNull();
    expect(events.emit).toBeCalled();
  });
  it("returns null and emits error if the driver fails to get the pageParams", async () => {
    ctx.driver.page.getPage.mockResolvedValue({ getParams: "someGetParams" });
    ctx.driver.someGetParams.mockRejectedValue("some error");

    const response = await getNewFullPage(ctx);

    expect(response).toBeNull();
    expect(events.emit).toBeCalled();
  });

  it("chooses one page, if there are more than one", async () => {
    ctx.driver.page.getPage.mockResolvedValue([{ id: 1 }, { id: 2 }]);

    chooseOne.mockImplementation(({ array }) => array[0]);
    await getNewFullPage(ctx);

    expect(chooseOne).toBeCalled();
  });

  it("use the default params if getParams returns falsy", async () => {
    ctx.driver.page.getPage.mockResolvedValue({ getParams: "someGetParams" });
    ctx.driver.someGetParams.mockResolvedValue(false);
    await getNewFullPage(ctx);
  });
});
