import getStoriesList from "./getStoriesList";
import getPagesList from "./getPagesList";

export default function storySSPsFactory({ driver, Components, layout }) {
  return async function getServerSideProps(ctx) {
    if (ctx.query.empty) {
      return {
        props: {
          exposeSharedState: true,
          areas: {},
        },
      };
    }
    const [stories, pages] = await Promise.all([
      getStoriesList({ driver, Components }),
      getPagesList({ driver }),
    ]);

    const response = {
      props: {
        clientSideOnly: true,
        layout: {
          name: "PlayGroundMainLayout_o",
          meta: [["title", "Orgasmo's playground"]],
          ...layout,
        },
        areas: {
          MainLayout_nav_o: {
            items: [
              {
                type: "PagesList_o",
                props: {
                  pages,
                },
              },
              {
                type: "Storieslist_o",
                props: {
                  stories,
                },
              },
            ],
          },
          PlaygroundTitle_o: {
            items: [
              {
                type: "h1",
                props: {
                  children: ["Orgasmo's Playground"],
                },
              },
            ],
          },
        } as Record<string, any>,
      },
    };

    return response;
  };
}
