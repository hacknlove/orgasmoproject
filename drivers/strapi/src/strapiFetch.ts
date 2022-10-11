const STRAPI_API_URL = process.env.STRAPI_API_URL;
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN;

export default async function strapiFetch(
  endpoint: string,
  options?: RequestInit
) {
  const response = await fetch(`${STRAPI_API_URL}${endpoint}`, {
    method: "GET",
    ...options,
    headers: {
      Authorization: `Bearer ${STRAPI_API_TOKEN}`,
      ...options?.headers,
    },
  })
    .then((r) => r.json())
    .catch((error) => ({ error }));

  return response;
}
