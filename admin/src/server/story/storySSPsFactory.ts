import AdminComponents from "../../components/Components";
export async function getStoriesList({ driver, Components }) {
  const stories =
    (await driver?.admin?.getAllStories?.().catch(() => ({}))) || {};

  for (const key in Components) {
    if (AdminComponents[key]) {
      continue;
    }
    if (!stories[key]) {
      stories[key] = {
        empty: {
          itemConfig: {
            props: {},
          },
          description: `Create the first story for the component ${key}`,
        },
      };
    }
  }

  return stories;
}

export function getPagesList({ driver }) {
  return driver?.admin?.getAllPages?.().catch(() => ({})) || {};
}

export function completeAreasComponent({ areas, ctx, stories }) {
  const storyConfig = stories[ctx.query.component]?.[ctx.query.story];

  if (!storyConfig) {
    return;
  }

  areas.mainArea_o = {
    items: [{
      type: 'StoryLayout_o'
    }]
  }

  areas.storyComponent = {
    items: [
      {
        type: "StoryRender",
        props: {
          itemConfig: storyConfig.itemConfig,
        },
      },
    ],
  };

  areas.storyPlayground = {
    items: [
      {
        type: "StoryPlayground",
        props: {
          story: ctx.query.story,
          description: storyConfig.description,
          itemConfig: storyConfig.itemConfig,
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

  return true
}

export function completeAreasPage({ areas, ctx, pages }) {
  const pageConfig = pages[ctx.query.path]?.[ctx.query.pageId];

  if (!pageConfig) {
    return;
  }

  areas.mainArea_o = {
    items: [{
      type: 'PageLayout'
    }]
  }

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

function completeAreasSite ({ areas }) {

  areas.mainArea_o = {
    items: [{
      type: 'PageLayout'
    }]
  }

  return true
}

export default function storySSPsFactory({ driver, Components, layout }) {
  return async function getServerSideProps(ctx) {
    const [stories, pages] = await Promise.all([
      getStoriesList({ driver, Components }),
      getPagesList({ driver }),
    ]);

    const response = {
      props: {
        layout: {
          name: "PlayGroundMainLayout_o",
          meta: [["title", "Orgasmo's playground"]],
          ...layout,
        },
        areas: {
          storiesList: {
            items: Object.entries(stories).map(([component, stories]) => ({
              type: "StoryListComponent",
              props: {
                component,
                stories,
              },
            })),
          },
          pagesList: {
            items: Object.entries(pages).map(([path, stories]) => ({
              type: "PageListComponent",
              props: {
                path,
                stories,
              },
            })),
          },
        } as Record<string, any>,
      },
    };


    completeAreasComponent({ areas: response.props.areas, ctx, stories }) ||
    completeAreasPage({ areas: response.props.areas, ctx, pages }) ||
    completeAreasSite({ areas: response.props.areas })

    return response;
  };
}
