import strapiFetch from "../strapiFetch";

async function updateSiteConfig(id, siteConfig) {
  await strapiFetch(`site-configs/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: { siteConfig } }),
  });
}

async function newSiteConfig(siteConfig) {
  await strapiFetch("site-configs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: { siteConfig } }),
  });
}

export default async function upsertStoryConfig(ctx, siteConfig) {
  const exactMatch = await strapiFetch(`site-configs?pagination[pageSize]=1`);

  if (exactMatch?.data?.[0]?.id) {
    await updateSiteConfig(exactMatch.data[0].id, siteConfig);
  } else {
    await newSiteConfig(siteConfig);
  }
}
