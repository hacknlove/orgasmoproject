import getRow from "./getRow";
import getMore from "./getMore";
import apiCall from "./apiCall";

import apiFactory from "./factory";

jest.mock("./getRow", () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock("./getMore", () => ({
  __esModule: true,
  default: jest.fn(),
}));
jest.mock("./apiCall", () => ({
  __esModule: true,
  default: jest.fn(),
}));

jest.spyOn(console, "error").mockImplementation(() => undefined);

jest.mock("../events", () => ({
  __esModule: true,
  default: {
    emit: jest.fn(),
  },
}));

const driver = {};

const res = {};

describe("apiFactory", () => {
  it("calls getRow if the first part of orgasmo is _ogr", async () => {
    const req = {
      query: {
        orgasmo: ["_ogr"],
      },
    };
    await apiFactory({ driver })(req, res);
    expect(getRow).toHaveBeenCalledWith({ driver, req, res });
    expect(getMore).not.toHaveBeenCalled();
    expect(apiCall).not.toHaveBeenCalled();
  });
  it("calls getMore if the first part of orgasmo is _ogm", async () => {
    const req = {
      query: {
        orgasmo: ["_ogm"],
      },
    };
    await apiFactory({ driver })(req, res);
    expect(getMore).toHaveBeenCalledWith({ driver, req, res });
    expect(getRow).not.toHaveBeenCalled();
    expect(apiCall).not.toHaveBeenCalled();
  });
  it("calls apiCall if the first part of orgasmo is not _ogr or _ogm", async () => {
    const req = {
      query: {
        orgasmo: ["test"],
      },
    };
    await apiFactory({ driver })(req, res);
    expect(getMore).not.toHaveBeenCalled();
    expect(getRow).not.toHaveBeenCalled();
    expect(apiCall).toHaveBeenCalledWith({ driver, req, res });
  });
});
