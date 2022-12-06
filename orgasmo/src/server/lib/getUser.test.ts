/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import getUser from "./getUser";
import events from "../events";

jest.mock("../events", () => ({
  __esModule: true,
  default: {
    emit: jest.fn(),
  },
}));

describe("getUser", () => {
  let ctx;
  beforeEach(() => {
    ctx = {
      req: {},
      driver: {
        user: {
          getUser: jest.fn(() => ({ roles: ["someRol"] })),
        },
      },
    };
  });
  it("does nothing if the context has the user already", async () => {
    ctx.req.user = "something";
    await getUser(ctx);

    expect(ctx.driver.user.getUser).not.toBeCalled();
  });
  it("sets the default user is there is the driver have no getUser function. No error emited", async () => {
    delete ctx.driver.user;

    await getUser(ctx);

    expect(ctx.req.user.roles).toEqual([]);
    expect(events.emit).not.toBeCalled();
  });
  it("sets the default user is there is any error with the driver. An error is emited", async () => {
    ctx.driver.user.getUser.mockRejectedValue("reason");

    await getUser(ctx);

    expect(events.emit).toBeCalled();
    expect(ctx.req.user.roles).toEqual([]);
  });

  it("sets the default user is the driver returns falsy. No error is emited", async () => {
    ctx.driver.user.getUser.mockResolvedValue(null);

    await getUser(ctx);

    expect(events.emit).not.toBeCalled();
    expect(ctx.req.user.roles).toEqual([]);
  });

  it("adds the default roles if the returned user has no roles", async () => {
    ctx.driver.user.getUser.mockResolvedValue({ other: "what" });

    await getUser(ctx);

    expect(events.emit).not.toBeCalled();
    expect(ctx.req.user).toEqual({ roles: [], other: "what" });
  });

  it("set the returned user to the context", async () => {
    ctx.driver.user.getUser.mockResolvedValue({
      roles: ["some"],
      other: "what",
    });

    await getUser(ctx);

    expect(ctx.req.user).toEqual({ roles: ["some"], other: "what" });
  });
});
