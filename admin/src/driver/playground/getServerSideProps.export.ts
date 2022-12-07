import getStoriesList from "./getStoriesList";
import getPagesList from "../../driver/playground/getPagesList";
import getKVStorageList from "./getKVStorageList";
import config from "@orgasmo/orgasmo/config";

export default async function getServerSideProps(ctx) {
  const adminRole = config["driver.@orgasmo.admin.role"];
  if (adminRole && !ctx.req.user.roles.includes(adminRole)) {
    return {
      notFound: 404,
      props: {},
    };
  }
  if (ctx.query.empty) {
    return {
      props: {
        exposeSharedState: true,
        areas: {},
      },
    };
  }

  const Components = ctx.Components;
  const driver = ctx.driver;

  const [stories, pages, KVStorages] = await Promise.all([
    getStoriesList({ driver, Components }),
    getPagesList({ driver }),
    getKVStorageList({ driver }),
  ]);

  const response = {
    props: {
      clientSideOnly: true,
      layout: {
        name: "PlayGroundMainLayout_o",
        meta: [["title", "Orgasmo's playground"]],
      },
      areas: {
        MainLayout_nav_o: {
          items: [
            {
              type: "KVStorageList_o",
              props: {
                KVStorages,
              },
            },
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
}
