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

  areas.storyTitle = {
    items: [
      {
        type: "playgroundTitle_o",
        props: {
          component: ctx.query.component,
          story: ctx.query.story,
          isDirty: false,
        },
      },
    ],
  };

  return true;
}
