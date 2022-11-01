import parseDirectoryComponents from "../../admin/parseDirectory";
import parseDirectoryPages from "../../page/parseDirectory";
import parseKVSTorage from "../../kvStorage/parseDirectory";
export default function start() {
  return Promise.all([
    parseDirectoryComponents(),
    parseDirectoryPages(),
    parseKVSTorage(),
  ]);
}
