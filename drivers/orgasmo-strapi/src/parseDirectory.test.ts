import parseDirectory, { waitForIt, ids, paths } from "./parseDirectory";
import { glob } from "glob";
import { readJson } from "fs-extra";

jest.mock("glob", () => ({
  __esModule: true,
  glob: jest.fn((path, cb) => cb(null, [])),
}));

jest.spyOn(console, "error").mockImplementation(() => undefined);

jest.mock("fs-extra", () => ({
  __esModule: true,
  readJson: jest.fn(),
}));

describe("waitForIt", () => {
  beforeEach(() => {
    ids.clear();
    paths.clear();
    glob.mockImplementation((path, cb) => cb(null, ["some/test/Path"]));
  });
  it("is a promise", () => {
    expect(waitForIt).toBeInstanceOf(Promise);
  });
  it("is not resolved", async () => {
    const isResolved = jest.fn();
    await Promise.race([
      waitForIt.then(isResolved),
      new Promise((resolve) => setTimeout(resolve, 0)),
    ]);
    expect(isResolved).not.toBeCalled();
  });
  it("resolves when parseDirectory ends", async () => {
    const isResolved = jest.fn();
    await parseDirectory("/dev/null");
    await Promise.race([
      waitForIt.then(isResolved),
      new Promise((resolve) => setTimeout(resolve, 0)),
    ]);
    expect(isResolved).toBeCalled();
  });
});

describe("parseDirectory", () => {
  beforeEach(() => {
    ids.clear();
    paths.clear();
    glob.mockImplementation((path, cb) => cb(null, ["some/test/Path"]));
  });

  it("shows an error if the json is falsy", async () => {
    readJson.mockResolvedValue(undefined);

    await parseDirectory("someDirectory");

    expect(console.error).toBeCalledWith("Something wrong with some/test/Path");
  });

  it("shows an error if the pageConfig has no path", async () => {
    readJson.mockResolvedValue({});

    await parseDirectory("someDirectory");

    expect(console.error).toBeCalledWith(
      'some/test/Path is missing the required field "path"'
    );
  });

  it("shows an error if the pageConfig has no pageId", async () => {
    readJson.mockResolvedValue({
      path: "/foo/:bar",
    });

    await parseDirectory("someDirectory");

    expect(console.error).toBeCalledWith(
      'some/test/Path is missing the required field "pageId"'
    );
  });
  it("shows an error if there are two pages with the same pageId", async () => {
    ids.set("someId", {});

    readJson.mockResolvedValue({
      path: "/foo/:bar",
      pageId: "someId",
    });

    await parseDirectory("someDirectory");

    expect(console.error).toBeCalledWith(
      'There is already a pageConfig with the pageId "someId"'
    );
  });

  it("sets the page by pageId", async () => {
    readJson.mockResolvedValue({
      path: "/foo/:bar",
      pageId: "someOtherId",
    });

    await parseDirectory("someDirectory");

    expect(ids.has("someOtherId")).toBe(true);
  });

  it("adds the pageConfig as an array if there is another pageConfig for that path", async () => {
    glob.mockImplementation((path, cb) =>
      cb(null, ["some/file/path", "some/otherfile/path", "another/file/path"])
    );

    readJson.mockResolvedValueOnce({
      path: "/foo/:bar",
      pageId: "someId",
    });
    readJson.mockResolvedValueOnce({
      path: "/foo/:bar",
      pageId: "someOtherId",
    });
    readJson.mockResolvedValueOnce({
      path: "/foo/:bar",
      pageId: "anotherIdMore",
    });

    await parseDirectory("someDirectory");

    expect(paths.get("/foo/:bar").pageConfig).toEqual([
      {
        path: "/foo/:bar",
        pageId: "someId",
      },
      {
        path: "/foo/:bar",
        pageId: "someOtherId",
      },
      {
        path: "/foo/:bar",
        pageId: "anotherIdMore",
      },
    ]);
  });

  it("sorts the paths", async () => {
    glob.mockImplementation((path, cb) =>
      cb(null, ["some/file/path", "some/otherfile/path", "another/file/path"])
    );

    readJson.mockResolvedValueOnce({
      path: "/foo/:second",
      pageId: "someOtherId",
    });
    readJson.mockResolvedValueOnce({
      path: "/foo/(last)",
      pageId: "someId",
    });
    readJson.mockResolvedValueOnce({
      path: "/foo/first",
      pageId: "anotherIdMore",
    });
    await parseDirectory("someDirectory");

    expect(Array.from(paths.keys())).toEqual([
      "/foo/first",
      "/foo/:second",
      "/foo/(last)",
    ]);
  });
});
