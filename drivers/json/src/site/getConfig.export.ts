import { readJson } from "fs-extra";
import { sitePath } from "../consts";

export default async function siteGetConfig() {
  try {
    const siteConfig = await readJson(sitePath, { throws: false });

    if (!siteConfig) {
      return {};
    }

    return siteConfig;
  } catch {
    return {};
  }
}
