import { cleanAwaitJson } from "@orgasmo/orgasmo/cleanJson";

export async function getStoriesList({ driver, Components }) {
  const stories =
    (await driver?.story?.getAllStories().catch(() => ({}))) || {};

  for (const key of Object.keys(Components)) {
    if (!stories[key]) {
      stories[key] = [
        {
          props: {},
          name: "empty",
          description: `Create the first story for the component ${key}`,
        },
      ];
    }
  }

  return stories;
}

export async function storyIndexSSPsFactory(props) {
  const stories = await getStoriesList(props);

  return {
    props: {
      layout: {
        name: "StoryIndex",
        meta: [["title", "Orgasmo's stories"]],
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
      },
    },
  };
}

export default function storySSPsFactory({ driver, Components }) {
  return async function getServerSideProps(ctx) {
    if (!ctx.query?._o?.length) {
      return storyIndexSSPsFactory({ driver, Components });
    }

    return { notFound: true };

    /*         let storyPageConfig = '_ostoryPageIndex'

        if (!ctx.query?._o?.length) {
            storyPageConfig = '_ostoryPage'
        }

        const pageConfig = cleanAwaitJson(
            driver.page.getPageConfigFromId(storyPageConfig)
        );

        return {
            props: {
              pageConfigs: Object.fromEntries(
                pageConfigs.map((pageConfig) => [pageConfig.pageId, pageConfig])
              ),
              adminPageConfig: await adminConfig,
              driverMethods: Object.keys(driver).filter((method) =>
                method.includes(".")
              ),
              resolvedUrl: ctx.resolvedUrl,
            },
          }; */
  };
}
