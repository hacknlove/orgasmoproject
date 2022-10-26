import { sitePath } from "../consts";
import { remove } from "fs-extra";

export default async function SavePageConfig() {
  await remove(sitePath);
}
