const parseFiles = require("./parseFiles");

describe("parseFiles", () => {
  it("maps an array of paths into the matched groups, given a regexp", () => {
    const files = [
      "foo-1/bar-1/baz.this.js",
      "foo-2/bar-2/baz.js",
      "foo-3/bar-3/baz.js",
      "foo-4/bar-4/baz.this.js",
      "foo-5/bar-5/baz.js",
      "nope-6/dope-6/baz.this.js",
    ];

    const match = /^foo-(?<foo>[\d]*)\/bar-(?<bar>[\d]*)\/baz.this.js$/;

    const expected = [
      { foo: "1", bar: "1" },
      { foo: "4", bar: "4" },
    ];

    const actual = parseFiles(files, match);
    expect(actual).toEqual(expected);
  });
  it("uses map, if provided", () => {
    const files = [
      "foo-1/bar-1/baz.this.js",
      "foo-2/bar-2/baz.js",
      "foo-3/bar-3/baz.js",
      "foo-4/bar-4/baz.this.js",
      "foo-5/bar-5/baz.js",
      "nope-6/dope-6/baz.this.js",
    ];

    const match = /^foo-(?<foo>[\d]*)\/bar-(?<bar>[\d]*)\/baz.this.js$/;

    const map = (groups) => ({
      foo: groups.foo,
      bar: groups.bar,
      foobar: `${groups.foo}${groups.bar}`,
    });

    const expected = [
      { foo: "1", bar: "1", foobar: "11" },
      { foo: "4", bar: "4", foobar: "44" },
    ];

    const actual = parseFiles(files, match, map);
    expect(actual).toEqual(expected);
  });
});
