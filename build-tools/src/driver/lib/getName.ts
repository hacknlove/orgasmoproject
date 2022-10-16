export default function getName(route, filename) {
  return filename === "index"
    ? route.replace(/^.*\/([^/]*?)$/g, "$1")
    : filename;
}
