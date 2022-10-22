export default async function getFile(ctx) {
  console.log(ctx.req.body);

  const splitedPath = ctx.req.body.filePath.split("/");

  let content = {};

  switch (splitedPath[1]) {
    case "site":
      content = await ctx.driver["site.getConfig"]();
  }

  ctx.res.json(content);
}
