import strapiFetch from "../strapiFetch";

export default async function upsertStoryConfig() {
  const exactMatch = await strapiFetch(`site-configs?pagination[pageSize]=1`);

  return exactMatch?.data?.[0]?.attributes?.siteConfig ?? {};
}
