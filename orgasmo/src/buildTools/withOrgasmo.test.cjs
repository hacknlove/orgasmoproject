jest.mock("./processType.cjs", () =>
  jest.fn(() => jest.fn(() => "processType"))
);

const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

const processType = require("./processType.cjs");
const withOrgasmo = require("./withOrgasmo.cjs");

describe("withOrgasmo", () => {
  beforeEach(() => {
    jest.resetModules();
  }),
    it("calls processType for all the types with the right parameters", async () => {
      await withOrgasmo({
        scss: "scss param",
        driver: "driver param",
        components: "components param",
      })()();

      expect(processType.mock.calls[1][0]).toEqual({
        type: "scss",
        isEnabled: "scss param",
        isDevelopmentServer: false,
      });
      expect(processType.mock.calls[2][0]).toEqual({
        type: "driver",
        isEnabled: "driver param",
        externalPackage: "driver param",
        isDevelopmentServer: false,
      });
      expect(processType.mock.calls[3][0]).toEqual({
        type: "components",
        isEnabled: "components param",
        externalPackage: "components param",
        isDevelopmentServer: false,
      });
    });
  it("in development phase,  isDevelopmentServer is true", async () => {
    await withOrgasmo({
      scss: "scss param",
      driver: "driver param",
      components: "components param",
    })()(PHASE_DEVELOPMENT_SERVER);

    expect(processType.mock.calls[1][0]).toEqual({
      type: "scss",
      isEnabled: "scss param",
      isDevelopmentServer: true,
    });
    expect(processType.mock.calls[2][0]).toEqual({
      type: "driver",
      isEnabled: "driver param",
      externalPackage: "driver param",
      isDevelopmentServer: true,
    });
    expect(processType.mock.calls[3][0]).toEqual({
      type: "components",
      isEnabled: "components param",
      isDevelopmentServer: true,
      externalPackage: "components param",
    });
  });
  it("all types default to true", async () => {
    await withOrgasmo()()();

    expect(processType.mock.calls[0][0]).toEqual({
      type: "config",
      isEnabled: true,
      isDevelopmentServer: false,
      externalPackage: false,
    });

    expect(processType.mock.calls[1][0]).toEqual({
      type: "scss",
      isEnabled: true,
      isDevelopmentServer: false,
    });
    expect(processType.mock.calls[2][0]).toEqual({
      type: "driver",
      isEnabled: true,
      isDevelopmentServer: false,
      externalPackage: false,
    });
    expect(processType.mock.calls[3][0]).toEqual({
      type: "components",
      isEnabled: true,
      isDevelopmentServer: false,
      externalPackage: false,
    });
  });
  it("calls cb and returns its response (if cb is a function)", async () => {
    const cb = () => "cb response";
    expect(await withOrgasmo()(cb)()).toBe("cb response");
  });

  it("calls withTM with cb itself if it's not a function", async () => {
    expect(await withOrgasmo()("nextConfigItself")()).toBe("nextConfigItself");
  });
});
