"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const AdminContext_1 = require("../AdminContext");
const react_1 = require("react");
const AdminDataLists_dynamic_1 = require("../AdminDataLists.dynamic");
function EditCSSVars() {
    const { updatePageConfig, pageConfig } = (0, react_1.useContext)(AdminContext_1.default);
    const [vars, setVars] = (0, react_1.useState)([]);
    const ref = (0, react_1.useRef)();
    const reset = (0, react_1.useCallback)(() => {
        const layoutCssVars = pageConfig?.layout?.cssVars ?? {};
        if (!layoutCssVars) {
            setVars([]);
            return;
        }
        const cssVars = Object.entries(layoutCssVars).map(([name, value]) => [name, value, value]);
        cssVars.sort((a, b) => a[0].charCodeAt(0) - b[0].charCodeAt(0));
        setVars(cssVars);
        return;
    }, [pageConfig?.layout?.cssVars]);
    const addOrUpdateCssVar = (0, react_1.useCallback)(({ name, value = "" }) => {
        name = name.replace(/\s+/g, "-");
        const item = vars.findIndex((e) => e[0] === name);
        if (item === -1) {
            return [...vars, [name, value, ""]];
        }
        return vars.map((e, i) => (i === item ? [name, value, e[2]] : e));
    }, [vars]);
    const addNewCssVar = (0, react_1.useCallback)(() => {
        const newVar = ref.current.value.trim();
        if (!newVar) {
            return;
        }
        const withValue = newVar.match(/^(?<name>[^=]+?)\s*=\s*(?<value>.*)$/);
        if (!withValue) {
            setVars(addOrUpdateCssVar({ name: newVar }));
        }
        else {
            setVars(addOrUpdateCssVar(withValue.groups));
        }
        ref.current.value = "";
    }, [vars, setVars, ref.current]);
    (0, react_1.useEffect)(reset, [reset, pageConfig?.layout?.cssVars]);
    const changed = (0, react_1.useMemo)(() => vars.find(([, a, b]) => a !== b), [vars]);
    const filter = (0, react_1.useCallback)((varName) => vars.every(([name, value]) => name !== varName || value === null), [vars]);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "_oadmin_dialog", children: [(0, jsx_runtime_1.jsx)(AdminDataLists_dynamic_1.AdminCSSVarsDataList, { filter: filter }), (0, jsx_runtime_1.jsx)("label", { children: "Edit CSS vars" }), (0, jsx_runtime_1.jsx)("div", { className: "_oadmin_dialog_grid_2", children: vars.map(([name, value, original], i) => value === null && original !== null ? null : ((0, jsx_runtime_1.jsxs)(react_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("label", { children: [name, " ", value !== original && "*"] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("input", { className: "input_o_with_x", type: "text", value: value ?? "", onChange: (event) => setVars(vars.map((element, j) => i === j
                                        ? [element[0], event.target.value, element[2]]
                                        : element)) }), (0, jsx_runtime_1.jsx)("span", { className: "input_o_x", onClick: () => setVars(vars.map((e, j) => (i === j ? [e[0], null, e[2]] : e))), children: "\u2716" })] })] }, name))) }), (0, jsx_runtime_1.jsxs)("div", { className: "input_o_new_item", children: [(0, jsx_runtime_1.jsx)("input", { list: "_oadminCSSVars", placeholder: "new variable", ref: ref, onKeyDown: (event) => event.key === "Enter" && addNewCssVar() }), (0, jsx_runtime_1.jsx)("button", { className: "button_o", onClick: addNewCssVar, children: "new var" })] }), (0, jsx_runtime_1.jsx)("div", { children: changed && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("button", { className: "button_o", onClick: reset, children: "Reset" }), (0, jsx_runtime_1.jsx)("button", { className: "button_o", onClick: () => {
                                updatePageConfig({
                                    ...pageConfig,
                                    layout: {
                                        ...pageConfig.layout,
                                        cssVars: Object.fromEntries(vars.filter((e) => e[1] !== null)),
                                    },
                                });
                            }, children: "Apply" })] })) })] }));
}
exports.default = EditCSSVars;
//# sourceMappingURL=EditCSSvars.dynamic.js.map