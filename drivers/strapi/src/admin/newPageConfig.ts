import strapiFetch from "../strapiFetch";

export default async function newPageConfig(ctx, pageConfig) {
  const response = await strapiFetch("page-configs", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ data: pageConfig }),
  }).catch((error) => ({ error }));

  return response;
}
