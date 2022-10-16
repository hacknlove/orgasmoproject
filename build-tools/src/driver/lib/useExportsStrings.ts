export default function useExportsStrings(imports) {
  if (!imports) {
    return "";
  }

  let string = "";

  for (const { route, filename, importName } of imports) {
    string = `${string}\n  ["${`${route}/${filename}`
      .replace(/index$/, "")
      .replace(/\//g, ".")}"]: ${importName},`;
  }

  return string;
}
