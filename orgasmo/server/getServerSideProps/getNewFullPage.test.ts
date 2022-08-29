import getNewFullPage from "./getNewFullPage";
import events from "../events";

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
});
