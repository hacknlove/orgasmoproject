import { writeJson } from "fs-extra";
import { sitePath } from "../consts";

export default async function SavePageConfig(ctx, siteConfig) {
  await writeJson(sitePath, siteConfig, { spaces: 2 });
}
