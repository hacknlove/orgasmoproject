import { outputJson } from "fs-extra";
import { sitePath } from "../consts";

export default async function SavePageConfig(ctx, siteConfig) {
  await outputJson(sitePath, siteConfig, { spaces: 2 });
}
