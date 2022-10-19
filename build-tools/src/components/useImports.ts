export default function useImports(imports) {
  if (!imports) {
    return "";
  }
  let string = "";
  for (const { filename, from } of imports) {
    string = `${string}
  ${filename}: dynamic(() => import("${from}.js"), {
    suspense: true,
    loading: undefined,
  }),`;
  }

  return string;
}
