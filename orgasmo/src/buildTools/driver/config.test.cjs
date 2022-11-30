/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { join } = require("path");
const chokidar = require("chokidar");
const glob = require("glob");
jest.mock("../isAModule", () => jest.fn());
const isAModule = require("../isAModule");

const watcher = {
  on: jest.fn(),
};
chokidar.watch = () => watcher;

const writeFile = jest.fn().mockResolvedValue();
const readFile = jest.fn().mockResolvedValue();

jest.mock("fs/promises", () => ({
  writeFile,
  readFile,
}));

jest.spyOn(console, "info").mockImplementation(() => undefined);

const {
  regexp,
  globPath,
  fileFromImports,
  map,
  refresh,
  empyStringTest,
  sort,
} = require("./config");

test("driver regexp gets the full path and the file name from components starting with capital leter and ending in dynamic.{js,...}", () => {
  const files = [
    "./drivers/@orgasmo/json/foo/bar.export.js",
    "./drivers/other/foo/bar.export.js",
    "./drivers/@orgasmo/json/foo/baz.js",
  ];

  expect(regexp.exec(files[0]).groups).toEqual({
    filename: "bar",
    from: "./drivers/@orgasmo/json/foo/bar.export.js",
    route: "foo",
    type: "export",
  });
  expect(regexp.exec(files[1])).toBeNull();
  expect(regexp.exec(files[2])).toBeNull();
});

test("driver globPath finds files from the driver folder ending with export", (done) => {
  const expected = ["./drivers/@orgasmo/json/foo.export.js"];

  glob(globPath, { cwd: join(__dirname, "/test/globPath") }, (err, files) => {
    if (err) {
      done(err);
    } else {
      try {
        expect(files).toEqual(expected);
        done();
      } catch (err) {
        done(err);
      }
    }
  });
});

describe("driver fileFromImport", () => {
  test("it returns a js source from imports", () => {
    const imports = [
      {
        filename: "foo",
        from: "./drivers/@orgasmo/json/something/foo.export.tsx",
        name: "foo",
        importName: "foo",
        route: "something",
        type: "export",
      },
      {
        filename: "bar",
        from: "./drivers/@orgasmo/json/something/bar.export.tsx",
        name: "bar",
        importName: "bar",
        route: "something",
        type: "export",
      },
      {
        filename: "baz",
        from: "./drivers/@orgasmo/json/something/bar.event.tsx",
        name: "baz",
        importName: "baz",
        route: "something",
        type: "event",
      },
      {
        filename: "cos",
        from: "./drivers/@orgasmo/json/something/cos.import.tsx",
        name: "cos",
        importName: "cos",
        route: "something",
        type: "import",
      },
    ];
    const expected = `\
/**
 * @file This file is created automatically at build time.
 * more info: https://docs.orgasmo.dev/
 */

import config from "./config.json";
import "./drivers/@orgasmo/json/something/cos.import.tsx";
import events from "orgasmo/events";
import baz from "./drivers/@orgasmo/json/something/bar.event.tsx";
import bar from "./drivers/@orgasmo/json/something/bar.export.tsx";
import foo from "./drivers/@orgasmo/json/something/foo.export.tsx";

const drivers = ["@orgasmo/json"];

const driver = {
  ["something.bar"]: bar,
  ["something.foo"]: foo,
  config,
}

driver["something"] = {};
driver["something"]["bar"] = bar;
driver["something"]["foo"] = foo;
events.on("baz", baz);

export default driver;

if (global.startDrivers) {
  for (const driverName of drivers) {
    const startMethodName = \`\${driverName.replace(/\\//g, '.')}.start\`;
    if (driver[startMethodName]) {
      driver[startMethodName]({
        driver,
        drivers,
        config,
      });
    }
  }
}
`;
    jest.spyOn(process, "exit").mockImplementation(() => undefined);
    const actual = fileFromImports(imports);
    expect(actual).toEqual(expected);
  });

  it("uses the externalPackage name if provided", () => {
    const imports = [
      {
        filename: "foo",
        from: "./drivers/@orgasmo/json/something/foo.export.tsx",
        name: "foo",
        importName: "foo",
        route: "something",
        type: "export",
      },
      {
        filename: "bar",
        from: "./drivers/@orgasmo/json/something/bar.export.tsx",
        name: "bar",
        importName: "bar",
        route: "something",
        type: "export",
      },
      {
        filename: "onSomething",
        from: "./drivers/@orgasmo/json/something1/onSomething.event.tsx",
        name: "onSomething",
        importName: "route1ーonSomething",
        route: "route1",
        type: "event",
      },
      {
        filename: "onSomething",
        from: "./drivers/@orgasmo/json/something2/onSomething.event.tsx",
        name: "onSomething",
        importName: "route2ーonSomething",
        route: "route2",
        type: "event",
      },
    ];
    const expected = `\
/**
 * @file This file is created automatically at build time.
 * more info: https://docs.orgasmo.dev/
 */

import config from "./config.json";
import events from "orgasmo/events";
import route1ーonSomething from "./drivers/@orgasmo/json/something1/onSomething.event.tsx";
import route2ーonSomething from "./drivers/@orgasmo/json/something2/onSomething.event.tsx";
import bar from "./drivers/@orgasmo/json/something/bar.export.tsx";
import foo from "./drivers/@orgasmo/json/something/foo.export.tsx";

const drivers = ["@orgasmo/json"];

const driver = {
  ["something.bar"]: bar,
  ["something.foo"]: foo,
  config,
}

driver["something"] = {};
driver["something"]["bar"] = bar;
driver["something"]["foo"] = foo;
events.on("onSomething", route1ーonSomething);
events.on("onSomething", route2ーonSomething);

export default driver;

if (global.startDrivers) {
  for (const driverName of drivers) {
    const startMethodName = \`\${driverName.replace(/\\//g, '.')}.start\`;
    if (driver[startMethodName]) {
      driver[startMethodName]({
        driver,
        drivers,
        config,
      });
    }
  }
}
`;
    const actual = fileFromImports(imports);
    expect(actual).toEqual(expected);
  });

  it("uses the driver as external package, if it is importable", () => {
    isAModule.mockResolvedValue(true);
    const imports = [
      {
        filename: "foo",
        from: "./drivers/@orgasmo/json/something/foo.export.tsx",
        name: "foo",
        importName: "foo",
        route: "something",
        type: "export",
      },
      {
        filename: "bar",
        from: "./drivers/@orgasmo/json/something/bar.export.tsx",
        name: "bar",
        importName: "bar",
        route: "something",
        type: "export",
      },
      {
        filename: "onSomething",
        from: "./drivers/@orgasmo/json/something1/onSomething.event.tsx",
        name: "onSomething",
        importName: "route1ーonSomething",
        route: "route1",
        type: "event",
      },
      {
        filename: "onSomething",
        from: "./drivers/@orgasmo/json/something2/onSomething.event.tsx",
        name: "onSomething",
        importName: "route2ーonSomething",
        route: "route2",
        type: "event",
      },
    ];
    const expected = `\
/**
 * @file This file is created automatically at build time.
 * more info: https://docs.orgasmo.dev/
 */

import config from "./config.json";
import ーorgasmoーjson from "@orgasmo/json";
import events from "orgasmo/events";
import route1ーonSomething from "./drivers/@orgasmo/json/something1/onSomething.event.tsx";
import route2ーonSomething from "./drivers/@orgasmo/json/something2/onSomething.event.tsx";
import bar from "./drivers/@orgasmo/json/something/bar.export.tsx";
import foo from "./drivers/@orgasmo/json/something/foo.export.tsx";

const drivers = ["@orgasmo/json"];

const driver = {
  ...ーorgasmoーjson,
  ["something.bar"]: bar,
  ["something.foo"]: foo,
  config,
}

driver["something"] = {};
driver["something"]["bar"] = bar;
driver["something"]["foo"] = foo;
events.on("onSomething", route1ーonSomething);
events.on("onSomething", route2ーonSomething);

export default driver;

if (global.startDrivers) {
  for (const driverName of drivers) {
    const startMethodName = \`\${driverName.replace(/\\//g, '.')}.start\`;
    if (driver[startMethodName]) {
      driver[startMethodName]({
        driver,
        drivers,
        config,
      });
    }
  }
}
`;

    const actual = fileFromImports(imports);

    expect(actual).toBe(expected);
  });
});

describe("driver map", () => {
  it("adds the importName and the name fields", () => {
    const groups = {
      filename: "foo",
      from: "./drivers/@orgasmo/json/some/route/foo.export.tsx",
      route: "some/route",
    };

    const expected = {
      filename: "foo",
      from: "./drivers/@orgasmo/json/some/route/foo.export.tsx",
      route: "some/route",
      importName: "someーrouteーfoo",
      name: "foo",
    };
    const actual = map(groups);
    expect(actual).toEqual(expected);
  });
  it("uses the last piece of the route as name if filename is index", () => {
    const groups = {
      filename: "index",
      from: "./drivers/@orgasmo/json/some/route/index.export.tsx",
      route: "some/route",
    };

    const expected = {
      filename: "index",
      from: "./drivers/@orgasmo/json/some/route/index.export.tsx",
      route: "some/route",
      importName: "someーrouteーindex",
      name: "route",
    };
    const actual = map(groups);
    expect(actual).toEqual(expected);
  });
});

describe("refresh", () => {
  test("if the file is empty or error, it does nothing", async () => {
    refresh();
    expect(watcher.on.mock.calls[0][0]).toBe("add");
    expect(watcher.on.mock.calls[1][0]).toBe("unlink");
    expect(watcher.on.mock.calls[2][0]).toBe("change");

    await watcher.on.mock.calls[0][1]();

    expect(writeFile).not.toBeCalled();
  });
  test("adds a comment at the end to trigger a refresh", async () => {
    refresh();
    expect(watcher.on.mock.calls[0][0]).toBe("add");
    expect(watcher.on.mock.calls[1][0]).toBe("unlink");
    expect(watcher.on.mock.calls[2][0]).toBe("change");

    readFile.mockResolvedValue("Some file");

    await watcher.on.mock.calls[0][1]();

    expect(writeFile).toBeCalled();
  });
});

describe("skip when imports is falsy", () => {
  it("returns empty string if no imports", () => {
    for (const fn of Object.values(empyStringTest)) {
      expect(fn()).toBe("");
    }
  });
});

describe("sort", () => {
  it("sorts", () => {
    const imports = [
      { from: "a" },
      { from: "b" },
      { from: "y" },
      { from: "c" },
      { from: "z" },
      { from: "x" },
      { from: "c" },
      { from: "y" },
    ];
    const sorted = [
      { from: "a" },
      { from: "b" },
      { from: "c" },
      { from: "c" },
      { from: "x" },
      { from: "y" },
      { from: "y" },
      { from: "z" },
    ];

    sort(imports);

    expect(imports).toEqual(sorted);
  });
});
