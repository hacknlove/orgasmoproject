export default function cacheControl({ ctx, item }) {
  if (!item.timeChunk) {
    return;
  }
  ctx.res.setHeader(
    "Cache-Control",
    `public, s-maxage=${
      item.timeChunk.revalidate / 1000
    }, immutable, must-revalidate, stale-while-revalidate=${
      item.timeChunk.revalidate / 1000
    }, stale-if-error=${item.timeChunk.expire / 1000}`
  );
}
