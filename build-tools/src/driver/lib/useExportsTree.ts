function expand(obj, name) {
  let string = "";
  for (const key in obj) {
    if (key === "__importName") {
      continue;
    }
    string = `${string}\n${name}["${key}"] = ${obj[key].__importName ?? "{}"};`;
    string = `${string}${expand(obj[key], `${name}["${key}"]`)}`;
  }
  return string;
}

export default function useExportsTree(imports) {
  if (!imports) {
    return "";
  }

  const all = {};

  for (const { route, name, importName } of imports) {
    let current = all;
    if (route) {
      for (const part of route.split("/")) {
        current = current[part] = current[part] ?? {};
      }
    }
    current[name] = current[name] ?? {};
    current[name].__importName = importName;
  }

  return expand(all, "driver");
}
