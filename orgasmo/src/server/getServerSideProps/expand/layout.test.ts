import expandLayout from "./layout";

describe("expandLayout", () => {
  const params = {};
  let ctx;
  beforeEach(() => {
    ctx = {
      driver: {
        "foo.method": jest.fn(),
        "bar.method": jest.fn(),
      },
    };
  });

  it("expands the meta when getMeta is there", async () => {
    await expandLayout({
      ctx,
      params,
      layoutConfig: { getMeta: "foo.method" },
    });
    expect(ctx.driver["foo.method"]).toBeCalled();
  });
  it("expands the cssVars when getCssVars is there", async () => {
    await expandLayout({
      ctx,
      params,
      layoutConfig: { getCssVars: "foo.method" },
    });
    expect(ctx.driver["foo.method"]).toBeCalled();
  });
});
