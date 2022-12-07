import config from "@orgasmo/orgasmo/config";

export default async function strapiFetch(
  endpoint: string,
  options?: RequestInit
) {
  const { url, token } = config["driver.@orgasmo.strapi"];

  const response = await fetch(`${url}${endpoint}`, {
    method: "GET",
    ...options,
    headers: {
      Authorization: `Bearer ${token}`,
      ...options?.headers,
    },
  })
    .then((r) => r.json())
    .catch((error) => ({ error }));

  return response;
}
