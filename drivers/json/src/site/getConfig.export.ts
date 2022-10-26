import { readJson } from "fs-extra";
import { sitePath } from "../consts";

export default async function siteGetConfig() {
  const siteConfig = await readJson(sitePath, { throws: false });

  if (!siteConfig) {
    return {};
  }

  return siteConfig;
}
