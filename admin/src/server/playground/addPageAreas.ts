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

  areas.pagePlaygroundRender_o = {
    items: [
      {
        type: "PagePlaygroundRender_o",
        props: {
          pageConfig,
          pathSample: pageConfig.exactPath ?? ctx.query.pathSample ?? "",
        },
      },
    ],
  };

  areas.pagePlayground_o = {
    items: [
      {
        type: "PagePlayground_o",
        props: {
          pageConfig,
        },
      },
    ],
  };

  areas.PlaygroundTitle_o = {
    items: [
      {
        type: "PlaygroundDeleteItem_o",
        props: {
          label: "Delete Page",
          action: `/api/_oadmin/page?pageId=${ctx.query.pageId}`,
        },
      },
    ],
  };

  const pathSamplesSet = new Set();
  for (const { pathSamples } of Object.values(pages[ctx.query.path]) as any) {
    if (!pathSamples) {
      continue;
    }
    for (const pathSample of pathSamples) {
      pathSamplesSet.add(pathSample);
    }
  }
  const pathSamples = Array.from(pathSamplesSet);
  if (pathSamples.length) {
    areas.PlaygroundTitle_o.items.unshift({
      type: "PlaygroundSelectPathSample_o",
      props: {
        pathSamples,
      },
    });
  }

  return true;
}
