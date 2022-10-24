"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function useImports(imports) {
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
exports.default = useImports;
//# sourceMappingURL=useImports.js.map