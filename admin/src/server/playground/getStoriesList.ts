import AdminComponents from "../../clientSide/Components";

export default async function getStoriesList({ driver, Components }) {
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
