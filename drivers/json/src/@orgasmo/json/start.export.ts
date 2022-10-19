import parseDirectoryComponents from "../../admin/parseDirectory.";
import parseDirectoryPages from "../../page/parseDirectory";

export default function start() {
  return Promise.all([parseDirectoryComponents(), parseDirectoryPages()]);
}
