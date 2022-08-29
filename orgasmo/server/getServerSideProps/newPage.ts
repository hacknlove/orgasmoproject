import events from "../events";
import cacheNewItem from "../cache/cacheNewItem";

export default async function newPage({ ctx, pageKey }) {
  const newPage = await ctx.driver.page.getPage(ctx).catch((error) => {
    events.emit("error", { error, ctx });
  });

  if (newPage) {
    return {
      notFound: true,
    };
  }

  if (newPage.response) {
    cacheNewItem({
      ctx,
      key: pageKey,
      item: newPage,
    });
    return newPage.response;
  }
}
