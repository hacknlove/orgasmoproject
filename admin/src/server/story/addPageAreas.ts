export default function addPageAreas({ areas, ctx, pages }) {
  const pageConfig = pages[ctx.query.path]?.[ctx.query.pageId];

  if (!pageConfig) {
    return;
  }

  areas.mainArea_o = {
    items: [
      {
        type: "PageLayout_o",
      },
    ],
  };

  areas.pageRender = {
    items: [
      {
        type: "PageRender",
        props: {
          pageConfig,
        },
      },
    ],
  };

  areas.pagePlayground = {
    items: [
      {
        type: "PagePlayground",
        props: {
          pageConfig,
        },
      },
    ],
  };

  areas.playgroundTitle = {
    items: [
      {
        type: "PlaygroundTitle_o",
        props: {
          path: ctx.query.path,
          pageId: ctx.query.pageId,
          isDirty: false,
        },
      },
    ],
  };

  return true;
}
