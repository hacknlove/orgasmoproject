export default function importEvents(imports) {
  if (!imports) {
    return "";
  }

  let string = "";

  for (const { importName, from } of imports) {
    string = `${string}\nimport ${importName} from "${from}";`;
  }

  return string;
}
