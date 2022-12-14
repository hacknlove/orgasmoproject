/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
jest.spyOn(console, "info").mockImplementation(() => undefined);
jest.mock("glob", () =>
  jest.fn((param, callback) => callback(null, ["paths", "from", "glob"]))
);

const watcher = {
  on: jest.fn(),
};

jest.mock("chokidar", () => ({
  watch: jest.fn().mockReturnValue(watcher),
}));

const writeFile = jest.fn().mockResolvedValue();

jest.mock("fs", () => ({
  promises: {
    writeFile,
  },
}));

jest.mock("./parseFiles.cjs", () =>
  jest.fn().mockReturnValue([{ fileName: "filename", from: "from" }])
);

const glob = require("glob");
const parseFiles = require("./parseFiles.cjs");
const { importAll, watchAll } = require("./importAll");
const chokidar = require("chokidar");

jest.setTimeout(24 * 60 * 60 * 1000);

describe("importAll", () => {
  it("gets the files' paths , parses them into an imports array, generates a source, and writes it to a file", async () => {
    const someMapFunction = jest.fn();
    const fileFromImports = jest.fn().mockReturnValue("fileFromImports");
    await importAll({
      globPath: "some/glob/path",
      regexp: /some-regexp/,
      map: someMapFunction,
      fileFromImports: fileFromImports,
      filename: "some/filename",
    });

    expect(glob.mock.calls[0][0]).toBe("some/glob/path");
    expect(parseFiles).toHaveBeenCalledWith(
      ["paths", "from", "glob"],
      /some-regexp/,
      someMapFunction
    );
    expect(fileFromImports).toHaveBeenCalledWith(
      [{ fileName: "filename", from: "from" }],
      undefined
    );
    expect(writeFile).toHaveBeenCalledWith("some/filename", "fileFromImports");
  });
});

describe("watchAll", () => {
  it("watches the glob path and updates the file when a file is added or removed", async () => {
    const config = {
      globPath: "some/glob/path",
      regexp: /some-regexp/,
      map: jest.fn(),
      fileFromImports: () => "fileFromImports",
      filename: "some/filename",
    };
    watchAll(config);
    expect(chokidar.watch).toHaveBeenCalledWith("some/glob/path", {
      ignoreInitial: true,
      awaitWriteFinish: true,
    });

    expect(watcher.on.mock.calls[0][0]).toBe("add");
    expect(watcher.on.mock.calls[1][0]).toBe("unlink");

    await watcher.on.mock.calls[0][1]();
    await new Promise((resolve) => setTimeout(resolve, 0));

    expect(writeFile).toHaveBeenCalledWith("some/filename", "fileFromImports");
  });

  it("calls config.refresh if defined", () => {
    const config = {
      globPath: "some/glob/path",
      regexp: /some-regexp/,
      map: jest.fn(),
      fileFromImports: () => "fileFromImports",
      filename: "some/filename",
      refresh: jest.fn(),
    };
    watchAll(config);

    expect(config.refresh).toBeCalled();
  });

  it("watch changes if the config has watchChange", () => {
    watchAll({ watchChange: true });

    expect(watcher.on.mock.calls[2][0]).toBe("change");
  });
});
