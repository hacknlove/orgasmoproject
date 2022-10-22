export default async function getFile(ctx) {
  console.log(ctx.req.body);

  const splitedPath = ctx.req.body.filePath.split("/");

  let content = {};

  switch (splitedPath[1]) {
    case "site":
      content = await ctx.driver["site.getConfig"]();
      break;
    case "component": {
      content = (await ctx.driver.admin?.getComponentStory({
        component: splitedPath[2],
        story: splitedPath[3],
      })) ?? {
        component: splitedPath[2],
        story: splitedPath[3],
        description: "Create a new story",
        itemConfig: {
          type: splitedPath[2],
          props: {},
        },
      };
      break;
    }
    case "page": {
      content = await ctx.driver.page.getPageConfigFromId(splitedPath[2]);
      break;
    }
  }

  ctx.res.json(content);
}
