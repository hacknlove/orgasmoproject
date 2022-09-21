const STRAPI_API_URL = process.env.STRAPI_API_URL;
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

export default async function strapiFetch(endpoint) {
  const response = await fetch(`${STRAPI_API_URL}${endpoint}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${STRAPI_API_TOKEN}`,
    },
  })
    .then((r) => r.json())
    .catch((error) => ({ error }));

  return response;
}
