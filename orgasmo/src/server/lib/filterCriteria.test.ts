/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import filterCriteria from "./filterCriteria";

function getPagesId(pageConfigs) {
  return pageConfigs.map((x) => x.pageId);
}

describe("filterCriteria", () => {
  const pageConfigs = [
    {
      pageId: "forAll",
    },
    {
      pageId: "onlyMember",
      roles: {
        cannot: ["guest"],
        must: ["member"],
      },
    },
    {
      pageId: "onlyGuest",
      roles: {
        cannot: ["member"],
        must: ["guest"],
      },
    },
    {
      pageId: "onlyAdmin",
      roles: {
        cannot: ["guest", "member"],
        must: ["admin"],
      },
    },
    {
      pageId: "onlyGuestAndMember",
      roles: {
        any: ["guest", "member"],
      },
    },
  ];

  it("guest only see pages for guests", () => {
    expect(getPagesId(filterCriteria(pageConfigs, "roles", ["guest"]))).toEqual(
      ["forAll", "onlyGuest", "onlyGuestAndMember"]
    );
  });
  it("admin only see pages for admin", () => {
    expect(getPagesId(filterCriteria(pageConfigs, "roles", ["admin"]))).toEqual(
      ["forAll", "onlyAdmin"]
    );
  });
});
