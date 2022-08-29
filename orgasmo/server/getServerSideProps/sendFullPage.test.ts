import sendFullPage from "./sendFullPage";
import setCookies from "../lib/setCookies";
import cacheControl from "../lib/cacheControl";

jest.mock("../lib/setCookies", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.mock("../lib/cacheControl", () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe("sendFullPage", () => {
  const ctx = {};
  const pageConfig = {
    response: "some response",
  };
  it("calls setCookies and cacheControl", async () => {
    expect(await sendFullPage({ ctx, pageConfig })).toBe("some response");
    expect(setCookies).toBeCalled();
    expect(cacheControl).toBeCalled();
  });
});
