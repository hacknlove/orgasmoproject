/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import processRow from "./processRow";

describe("processRow", () => {
  it("returns type and props from rowConfig", async () => {
    const rowConfig = {
      type: "SomeType",
      props: {
        className: "classname-test",
      },
      someOtherShit: "test",
    };

    const row = await processRow({
      rowConfig,
      params: {},
      ctx: { driver: {} },
    });

    expect(row).toEqual({
      type: "SomeType",
      props: {
        className: "classname-test",
      },
    });
  });
  it("get extra props from the driver", async () => {
    const rowConfig = {
      type: "SomeType",
      props: {
        foo: "foo",
        className: "classname-test",
      },
      getProps: "getFooBar",
    };
    const driver = {
      getFooBar: jest.fn(async () => {
        return {
          bar: "bar",
          className: "classname-test-2",
        };
      }),
    };
    const row = await processRow({ rowConfig, params: {}, ctx: { driver } });

    expect(row).toEqual({
      type: "SomeType",
      props: {
        className: "classname-test",
        foo: "foo",
        bar: "bar",
      },
    });

    expect(driver.getFooBar).toHaveBeenCalledWith({
      ctx: { driver },
      rowConfig,
      params: {},
    });
  });
  it("defaults props to empty object", async () => {
    const rowConfig = {
      type: "SomeType",
    };

    const row = await processRow({
      rowConfig,
      params: {},
      ctx: { driver: {} },
    });

    expect(row).toEqual({
      type: "SomeType",
      props: {},
    });
  });
});
