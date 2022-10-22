import { readJson } from "fs-extra";

const dataPath =
  process.env.FILESYSTEM_DATA_PATH ?? "drivers/@orgasmo/json/data";

export default async function siteGetConfig() {
  const siteConfig = await readJson(`${dataPath}/site.json`, { throws: false });

  if (!siteConfig) {
    return {};
  }

  return siteConfig;
}
