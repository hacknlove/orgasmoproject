/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import logger from "../logger";
import getLabels from "./getLabels";

jest.mock("../logger", () => ({
  _esModule: true,
  default: {
    error: jest.fn(),
  },
}));

describe("getLabels", () => {
  it("returns if ctx has labels", async () => {
    const ctx = {
      driver: {
        labels: {
          getLabels: jest.fn(),
        },
      },
      req: {
        labels: [],
      },
    };

    await getLabels(ctx);

    expect(ctx.driver.labels.getLabels).not.toBeCalled();
  });
  it("default to empty array if no driver method", async () => {
    const ctx = {
      driver: {},
      req: {},
    };

    await getLabels(ctx);

    expect(ctx.req.labels).toEqual([]);
  });
  it("sets labels", async () => {
    const ctx = {
      driver: {
        labels: {
          getLabels: () => ["label"],
        },
      },
      req: {},
    };

    await getLabels(ctx);

    expect(ctx.req.labels).toEqual(["label"]);
  });
  it("logs on error", async () => {
    const ctx = {
      driver: {
        labels: {
          getLabels: () => {
            throw new Error("test");
          },
        },
      },
      req: {},
    };

    await getLabels(ctx);

    expect(logger.error).toBeCalled();
  });
  it("default to [] if the method returns falsy", async () => {
    const ctx = {
      driver: {
        labels: {
          getLabels: () => false,
        },
      },
      req: {},
    };

    await getLabels(ctx);

    expect(ctx.req.labels).toEqual([]);
  });
});
