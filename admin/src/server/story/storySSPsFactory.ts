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

export default function storySSPsFactory({ driver, Components, layout }) {
  return async function getServerSideProps(ctx) {
    const stories = await getStoriesList({ driver, Components });

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
          }
        } as Record<string, any>,
      },
    };

    const story = stories[ctx.query.component]?.[ctx.query.story];

    if (!story) {
      return response;
    }

    response.props.areas.storyComponent = {
      items: [
        {
          type: "StoryRender",
          props: {
            itemConfig: story.itemConfig,
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
            description: story.description,
            itemConfig: story.itemConfig,
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

    return response;
  };
}
