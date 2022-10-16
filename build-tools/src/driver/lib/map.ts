import getName from "./getName";

export default function map({ route = "", filename, from, type }) {
  return {
    from,
    route,
    filename,
    type,
    importName: `${route.replace(/[/[\].]/g, "ー")}ー${filename}`,
    name: getName(route, filename),
  };
}
