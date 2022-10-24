"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const AdminDataLists_dynamic_1 = require("../AdminDataLists.dynamic");
const AdminContext_1 = require("../AdminContext");
const metaTagsList = require("./metatags.json");
function EditMetaTags() {
    const { updatePageConfig, pageConfig } = (0, react_1.useContext)(AdminContext_1.default);
    const [metaTags, setMetaTags] = (0, react_1.useState)([]);
    const ref = (0, react_1.useRef)();
    const reset = (0, react_1.useCallback)(() => {
        const layoutMetaTags = pageConfig?.layout?.meta ?? [];
        if (!layoutMetaTags) {
            setMetaTags([]);
            return;
        }
        const metaTags = layoutMetaTags.map(([name, value]) => [name, value, value]);
        metaTags.sort((a, b) => a[0].charCodeAt(0) - b[0].charCodeAt(0));
        setMetaTags(metaTags);
        return;
    }, [pageConfig?.layout?.meta]);
    const addNewMetaTag = (0, react_1.useCallback)(() => {
        const newVar = ref.current.value.trim();
        if (!newVar) {
            return;
        }
        const withValue = newVar.match(/^(?<name>[^=]+)\s*=\s*(?<content>.*)$/);
        if (!withValue) {
            setMetaTags([...metaTags, [newVar.replace(/\s+/g, "-"), "", ""]]);
        }
        else {
            setMetaTags([
                ...metaTags,
                [
                    withValue.groups.name.replace(/\s+/g, "-"),
                    withValue.groups.content,
                    "",
                ],
            ]);
        }
        ref.current.value = "";
    }, [setMetaTags, metaTags, ref.current]);
    (0, react_1.useEffect)(reset, [reset, pageConfig?.layout?.meta]);
    const changed = (0, react_1.useMemo)(() => metaTags.find(([, a, b]) => a !== b), [metaTags]);
    const filter = (0, react_1.useCallback)((varName) => metaTags.every(([name, value]) => name !== varName || value === null), [metaTags]);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "_oadmin_dialog", children: [(0, jsx_runtime_1.jsx)(AdminDataLists_dynamic_1.default, { list: metaTagsList, id: "_oadminMeta", filter: filter }), (0, jsx_runtime_1.jsx)("label", { children: "Edit Meta Tags" }), (0, jsx_runtime_1.jsx)("div", { className: "_oadmin_dialog_grid_2", children: metaTags.map(([name, value, original], i) => value === null && original !== null ? null : ((0, jsx_runtime_1.jsxs)(react_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("label", { children: [name, " ", value !== original && "*"] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("input", { className: "input_o_with_x", type: "text", value: value ?? "", onChange: (event) => setMetaTags(metaTags.map((element, j) => i === j
                                        ? [element[0], event.target.value, element[2]]
                                        : element)) }), (0, jsx_runtime_1.jsx)("span", { className: "input_o_x", onClick: () => setMetaTags(metaTags.map((e, j) => (i === j ? [e[0], null, e[2]] : e))), children: "\u2716" })] })] }, name))) }), (0, jsx_runtime_1.jsxs)("div", { className: "input_o_new_item", children: [(0, jsx_runtime_1.jsx)("input", { list: "_oadminMeta", placeholder: "new variable", ref: ref, onKeyDown: (event) => event.key === "Enter" && addNewMetaTag() }), (0, jsx_runtime_1.jsx)("button", { className: "button_o", onClick: addNewMetaTag, children: "new meta tag" })] }), (0, jsx_runtime_1.jsx)("div", { children: changed && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("button", { className: "button_o", onClick: reset, children: "Reset" }), (0, jsx_runtime_1.jsx)("button", { className: "button_o", onClick: () => {
                                updatePageConfig({
                                    ...pageConfig,
                                    layout: {
                                        ...pageConfig.layout,
                                        meta: metaTags
                                            .filter((e) => e[1] !== null)
                                            .map((e) => [e[0], e[1]]),
                                    },
                                });
                            }, children: "Apply" })] })) })] }));
}
exports.default = EditMetaTags;
//# sourceMappingURL=EditMetaTags.dynamic.js.map