jest.mock("./importAll.cjs", () => ({
  importAll: jest.fn().mockReturnValue("importAll"),
  watchAll: jest.fn().mockReturnValue("watchAll"),
}));

const config = {
  mockedConfig: true,
};

jest.mock("./components/config.cjs", () => config);

const processType = require("./processType.cjs");
const { importAll, watchAll } = require("./importAll.cjs");

jest.spyOn(console, "info").mockImplementation(() => undefined);

describe("processType", () => {
  it("exits if not enabled", () => {
    const response = processType({
      type: "components",
      isEnabled: false,
      isDevelopmentServer: false,
    });
    expect(response).toBe(undefined);
    expect(importAll).not.toHaveBeenCalled();
    expect(watchAll).not.toHaveBeenCalled();
  });
  it("calls importAll with the specific config", () => {
    processType({
      type: "components",
      isEnabled: true,
      isDevelopmentServer: false,
    });
    expect(importAll).toHaveBeenCalledWith(config, undefined);
    expect(watchAll).not.toHaveBeenCalled();
  });
  it("calls watchAll with the specific config, if isDevelopmentServer is true", () => {
    processType({
      type: "components",
      isEnabled: true,
      isDevelopmentServer: true,
    });
    expect(importAll).toHaveBeenCalledWith(config, undefined);
    expect(watchAll).toHaveBeenCalledWith(config, undefined);
  });
});
