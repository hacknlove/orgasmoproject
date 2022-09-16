/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import getItems from "./getItems";
import processRow from "../lib/processRow";
import { serialize } from "../lib/serialization";

jest.mock("../lib/processRow");
jest.mock("../lib/setCookies");
jest.mock("../lib/serialization", () => ({
  serialize: jest.fn(),
}));

describe("getItems", () => {
  it("returns empty array if items is falsy", async () => {
    const items = await getItems({
      items: undefined,
      params: {},
      ctx: { driver: {} },
    });
    expect(items).toEqual([]);
  });
  it("calls processRow for each row and return the array of responses", async () => {
    const items = Array.from({ length: 5 }, (_, i) => `row${i}`);

    processRow.mockImplementation(async ({ rowConfig }) => ({
      props: { row: true, test: rowConfig },
    }));

    const response = await getItems({ items, params: {}, ctx: { driver: {} } });

    expect(processRow).toHaveBeenCalledTimes(5);

    expect(response).toEqual([
      { props: { row: true, test: "row0" } },
      { props: { row: true, test: "row1" } },
      { props: { row: true, test: "row2" } },
      { props: { row: true, test: "row3" } },
      { props: { row: true, test: "row4" } },
    ]);
  });

  it("stops when reaching the limit", async () => {
    const items = Array.from({ length: 5 }, (_, i) => `row${i}`);

    processRow.mockImplementation(async ({ rowConfig }) => ({
      props: { row: true, test: rowConfig },
    }));

    const response = await getItems({
      items,
      params: {},
      ctx: { driver: {} },
      limit: 3,
    });

    expect(processRow).toHaveBeenCalledTimes(3);

    expect(response).toEqual([
      { props: { row: true, test: "row0" } },
      { props: { row: true, test: "row1" } },
      { props: { row: true, test: "row2" } },
    ]);
  });
  it("calls setCookies for each row", async () => {
    const items = Array.from({ length: 5 }, () => ({
      cookies: {},
    }));

    items[0].cookies = [{}];

    (processRow as jest.Mock).mockImplementation(async ({ rowConfig }) => ({
      props: { row: true, test: rowConfig },
    }));

    const setCookies = [];

    await getItems({
      items,
      params: {},
      ctx: {
        setCookies,
        driver: {},
      },
      timeChunk: {},
    });

    expect(setCookies.length).toBe(5);
  });
  it("serializes the getMore property", async () => {
    const items = [{ props: { getMore: {}, test: true } }] as Record<
      string,
      any
    >;

    (processRow as jest.Mock).mockImplementation(
      async ({ rowConfig }) => rowConfig
    );
    (serialize as jest.Mock).mockImplementation((getMore) => getMore);

    await getItems({
      items,
      params: {},
      ctx: {
        driver: {},
        req: { user: { id: "test-user-id" } },
        setCookies: [],
      },
      timeChunk: {},
    });
    expect(items[0].props.src).toEqual(expect.any(String));
  });
  it("edge case, user not there", async () => {
    const items = [{ props: { getMore: {}, test: true } }] as Record<
      string,
      any
    >;

    (processRow as jest.Mock).mockImplementation(
      async ({ rowConfig }) => rowConfig
    );
    (serialize as jest.Mock).mockImplementation((getMore) => getMore);

    await getItems({
      items,
      params: {},
      ctx: {
        driver: {},
        req: { user: {} },
        setCookies: [],
      },
      timeChunk: {},
    });
    expect(items[0].props.src).toEqual(expect.any(String));
  });
  it("gets the item from the driver if needed", async () => {
    const items = [];
    const getItemConfig = jest.fn((params) => params);
    const response = await getItems({
      items,
      limit: 4,
      getItemConfig,
    });

    expect(response).toEqual(
      Array.from({ length: 4 }, (_, i) => ({
        number: i,
        params: undefined,
        relative: i,
      }))
    );
  });
  it("breaks the loop if there is no itemConfig", async () => {
    const items = [{}];
    const getItemConfig = jest.fn(() => undefined);
    const response = await getItems({
      items,
      limit: 4,
      getItemConfig,
    });

    expect(response).toEqual([{}]);
  });
  it("transform the cssVars into something you can pass to style props", async () => {
    const items = [
      {
        type: "Foo",
        props: {
          cssVars: {
            someVar: "someValue",
            someOtherVar: "someOtherValue",
          },
        },
      },
    ];
    const response = await getItems({
      items,
    });

    expect(response).toEqual([
      {
        type: "Foo",
        props: {
          cssVars: {
            "--someVar": "someValue",
            "--someOtherVar": "someOtherValue",
          },
        },
      },
    ]);
  });
});
