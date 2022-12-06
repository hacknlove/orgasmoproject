/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import strapiFetch from "./strapiFetch";

global.fetch = jest.fn();

describe("strapiFetch", () => {
  it("fetch", async () => {
    fetch.mockResolvedValue({
      json: () => Promise.resolve({ foo: "bar" }),
    });
    const response = await strapiFetch("localhost");

    expect(response).toEqual({ foo: "bar" });
  });
  it("resovles to the error if rejects", async () => {
    fetch.mockResolvedValue({
      json: () => Promise.reject({ foo: "bar" }),
    });
    const response = await strapiFetch("localhost", {
      options: {},
    });

    expect(response).toEqual({ error: { foo: "bar" } });
  });
});
