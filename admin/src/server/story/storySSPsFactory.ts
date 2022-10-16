import getStoriesList from "./getStoriesList";
import getPagesList from "./getPagesList";
import addComponentAreas from "./addComponentAreas";
import addPageAreas from "./addPageAreas";
import addSiteAreas from "./addSiteAreas";

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

    addComponentAreas({ areas: response.props.areas, ctx, stories }) ||
      addPageAreas({ areas: response.props.areas, ctx, pages }) ||
      addSiteAreas({ areas: response.props.areas });

    return response;
  };
}
