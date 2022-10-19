import getName from "./getName";

export default function map({ route = "", filename, from, type }) {
  return {
    from,
    route,
    filename,
    type,
    importName: `${route.replace(/[^a-z0-9_]/g, "ー")}ー${filename}`,
    name: getName(route, filename),
  };
}
