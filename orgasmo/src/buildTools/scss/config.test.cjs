const { regexp, globPath, fileFromImports } = require("./config");
const glob = require("glob");
const { join } = require("path");

test("scss regexp gets the full path for the scss files that are not module, copies or main style", () => {
  const files = [
    "./foo.scss",
    "./style.scss",
    "./bar.module.scss",
    "./foo copy.scss",
  ];

  expect(regexp.exec(files[0]).groups).toEqual({
    path: "./foo.scss",
  });
  expect(regexp.exec(files[1]).groups).toEqual({ path: undefined });
  expect(regexp.exec(files[2]).groups).toEqual({ path: undefined });
  expect(regexp.exec(files[3]).groups).toEqual({ path: undefined });
});

test("scss globPath finds all the scss, css and sass files", (done) => {
  const expected = ["./bar.css", "./baz.sass", "./foo.scss"];

  glob(globPath, { cwd: join(__dirname, "test/globPath") }, (err, files) => {
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

test("scss fileFromImports returns a scss source from imports", () => {
  const imports = [
    { path: "./some/path.scss" },
    { path: "./some/other/scss/file.scss" },
    { path: undefined },
  ];
  const expected = `/**
  * @file This file is created automatically at build time.
  * more info: https://docs.orgasmo.dev/
  */

@import "./some/path.scss";
@import "./some/other/scss/file.scss";
@import "@orgasmo/orgasmo/Slider.scss";
`;

  const actual = fileFromImports(imports);
  expect(actual).toEqual(expected);
});

test("scss skips files from node_modules", () => {
  const files = [
    "./foo.scss",
    "./style.scss",
    "./bar.module.scss",
    "./foo copy.scss",
    "./node_modules/orgasmo/buildTools/scss/test/globPath/bar.css",
  ];

  expect(regexp.exec(files[0]).groups).toEqual({
    path: "./foo.scss",
  });
  expect(regexp.exec(files[1]).groups).toEqual({ path: undefined });
  expect(regexp.exec(files[2]).groups).toEqual({ path: undefined });
  expect(regexp.exec(files[3]).groups).toEqual({ path: undefined });
});
