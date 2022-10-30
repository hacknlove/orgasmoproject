import strapiFetch from "../strapiFetch";

async function updatePageConfig(id, pageConfig) {
  await strapiFetch(`page-configs/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: pageConfig }),
  });
}

async function newPageConfig(pageConfig) {
  await strapiFetch("page-configs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: pageConfig }),
  });
}

export default async function SavePageConfig(ctx, pageConfig) {
  const exactMatch = await strapiFetch(
    `page-configs?filters[pageId][$eq]=${pageConfig.pageId}`
  );

  if (exactMatch?.data?.[0]?.id) {
    await updatePageConfig(exactMatch.data[0].id, pageConfig);
  } else {
    await newPageConfig(pageConfig);
  }
}
