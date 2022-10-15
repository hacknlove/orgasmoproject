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

export function completeComponent({ response, ctx, stories }) {
  const storyConfig = stories[ctx.query.component]?.[ctx.query.story];

  if (!storyConfig) {
    return null;
  }

  response.props.areas.storyComponent = {
    items: [
      {
        type: "StoryRender",
        props: {
          itemConfig: storyConfig.itemConfig,
        },
      },
    ],
  };

  response.props.areas.storyPlayground = {
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

  response.props.areas.storyTitle = {
    items: [
      {
        type: "StoryTitle",
        props: {
          component: ctx.query.component,
          story: ctx.query.story,
          isDirty: false,
        },
      },
    ],
  };
}

export function completePage({ response, ctx, pages }) {
  return null;
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
          name: "StoryIndex",
          meta: [["title", "Orgasmo's stories"]],
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

    return (
      completeComponent({ response, ctx, stories }) ||
      completePage({ response, ctx, pages }) ||
      response
    );
  };
}
