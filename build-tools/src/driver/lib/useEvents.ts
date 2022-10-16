export default function useEvents(imports) {
  if (!imports) {
    return "";
  }

  let string = "";

  for (const { importName, name } of imports) {
    string = `${string}events.on("${name}", ${importName});\n`;
  }

  return string;
}
