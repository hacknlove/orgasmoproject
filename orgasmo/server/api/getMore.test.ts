/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import getMore from "./getMore";
import parseCommand from "./parseCommand";

jest.mock("./parseCommand", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const res = {
  json: jest.fn(),
};

const req = {
  user: {},
  query: {
    from: "3",
    count: "6",
  },
};

describe("getMore", () => {
  it("does nothing if there is no command", async () => {
    await getMore({ req, res, driver: {} });
    expect(res.json).not.toHaveBeenCalled();
  });

  it("calls driver[command.getMore.handler] and waits for it and sends it as json", async () => {
    const driver = {
      ["test.getMore.handler"]: jest.fn(() => Promise.resolve({ test: "ok" })),
    };
    (parseCommand as jest.Mock).mockReturnValue({
      handler: "test.getMore.handler",
      moreParams: "test",
    });

    await getMore({
      req,
      res,
      driver,
    });
    expect(driver["test.getMore.handler"]).toHaveBeenCalledWith({
      from: 3,
      count: 6,
      handler: "test.getMore.handler",
      moreParams: "test",
    });
    expect(res.json).toHaveBeenCalledWith({ test: "ok" });
  });

  it("serialized getMore", async () => {
    const driver = {
      ["test.getMore.handler"]: jest.fn(() =>
        Promise.resolve({ getMore: { serialice: "this" } })
      ),
    };
    (parseCommand as jest.Mock).mockReturnValue({
      handler: "test.getMore.handler",
    });

    await getMore({
      driver,
      res,
      req,
    });

    expect(res.json).toHaveBeenCalledWith({ src: expect.any(String) });
  });
});
