"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const AsyncComponents_1 = require("@orgasmo/orgasmo/AsyncComponents");
const react_1 = require("react");
const AdminContext_1 = require("../AdminContext");
function EditCookieOptions({ resolve, serializedOptions }) {
    const [editOptions, setEditOptions] = (0, react_1.useState)(JSON.parse(serializedOptions));
    const onChange = (0, react_1.useCallback)((event) => {
        setEditOptions((editOptions) => ({
            ...editOptions,
            [event.target.name]: event.target.value,
        }));
    }, [setEditOptions]);
    const onCheck = (0, react_1.useCallback)((event) => {
        setEditOptions((editOptions) => ({
            ...editOptions,
            [event.target.name]: !editOptions[event.target.name],
        }));
    }, [setEditOptions]);
    const isDirty = (0, react_1.useMemo)(() => serializedOptions !== serializeOrdered(editOptions), [editOptions, serializedOptions]);
    return ((0, jsx_runtime_1.jsx)("div", { className: "modal_o_wrapper", onClick: (event) => {
            event.stopPropagation();
            if (event.target.className === "modal_o_wrapper") {
                resolve();
            }
        }, children: (0, jsx_runtime_1.jsxs)("div", { className: "modal_o", children: [(0, jsx_runtime_1.jsxs)("div", { id: "_oadmin_menu_pageId", children: [(0, jsx_runtime_1.jsx)("span", { children: "Edit cookie options" }), (0, jsx_runtime_1.jsx)("button", { className: "button_o", onClick: () => resolve(), children: "\u2716" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "modal_o_fields", children: [(0, jsx_runtime_1.jsx)("label", { children: "Domain" }), (0, jsx_runtime_1.jsx)("input", { value: editOptions.domain ?? "", name: "domain", onChange: onChange }), (0, jsx_runtime_1.jsx)("label", { children: "Path" }), (0, jsx_runtime_1.jsx)("input", { value: editOptions.path ?? "", name: "path", onChange: onChange }), (0, jsx_runtime_1.jsx)("label", { children: "Expires" }), (0, jsx_runtime_1.jsx)("input", { type: "datetime-local", value: editOptions.expires ?? "", name: "expires", onChange: onChange }), (0, jsx_runtime_1.jsx)("label", { children: "Max Age" }), (0, jsx_runtime_1.jsx)("input", { type: "number", value: editOptions.maxAge ?? "", name: "maxAge", onChange: onChange })] }), (0, jsx_runtime_1.jsxs)("label", { children: [(0, jsx_runtime_1.jsx)("input", { type: "checkbox", checked: Boolean(editOptions.httpOnly), name: "httpOnly", onClick: onCheck }), "\u2002HTTP Only"] }), (0, jsx_runtime_1.jsxs)("label", { children: [(0, jsx_runtime_1.jsx)("input", { type: "checkbox", checked: Boolean(editOptions.sameSite), name: "sameSite", onClick: onCheck }), "\u2002Same Site"] }), (0, jsx_runtime_1.jsxs)("label", { children: [(0, jsx_runtime_1.jsx)("input", { type: "checkbox", checked: Boolean(editOptions.secure), name: "secure", onClick: onCheck }), "\u2002Secure"] }), isDirty && ((0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("button", { className: "button_o", onClick: () => setEditOptions(JSON.parse(serializedOptions)), children: "Reset" }), (0, jsx_runtime_1.jsx)("button", { className: "button_o", onClick: () => resolve(serializeOrdered(editOptions)), children: "Apply" })] }))] }) }));
}
function serializeOrdered(object) {
    if (!object) {
        return "{}";
    }
    const entries = Object.entries(object);
    entries.sort((a, b) => {
        if (a[0] < b[0]) {
            return -1;
        }
        if (b[0] < a[0]) {
            return 1;
        }
        return 0;
    });
    return JSON.stringify(Object.fromEntries(entries));
}
function EditCookies() {
    const { updatePageConfig, pageConfig } = (0, react_1.useContext)(AdminContext_1.default);
    const [cookies, setCookies] = (0, react_1.useState)([]);
    const ref = (0, react_1.useRef)();
    const reset = (0, react_1.useCallback)(() => {
        const pageCookies = pageConfig?.cookies ?? [];
        if (!pageCookies) {
            setCookies([]);
            return;
        }
        const cookies = pageCookies.map(([name, value, options]) => [
            name,
            value,
            serializeOrdered(options),
            `${value};${serializeOrdered(options)}`,
        ]);
        cookies.sort((a, b) => a[0].charCodeAt(0) - b[0].charCodeAt(0));
        setCookies(cookies);
        return;
    }, [pageConfig?.cookies]);
    const addNewCookie = (0, react_1.useCallback)(() => {
        const newVar = ref.current.value.trim();
        if (!newVar) {
            return;
        }
        const withValue = newVar.match(/^(?<name>[^=]+)\s*=\s*(?<content>.*)$/);
        if (!withValue) {
            setCookies([...cookies, [newVar.replace(/\s+/g, "-"), "", "{}", ""]]);
        }
        else {
            setCookies([
                ...cookies,
                [
                    withValue.groups.name.replace(/\s+/g, "-"),
                    withValue.groups.content,
                    "{}",
                    "",
                ],
            ]);
        }
        ref.current.value = "";
    }, [setCookies, cookies, ref.current]);
    (0, react_1.useEffect)(reset, [reset, pageConfig?.cookies]);
    const changed = (0, react_1.useMemo)(() => cookies.find(([, value, options, original]) => `${value};${options}` !== original), [cookies]);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "_oadmin_dialog", children: [(0, jsx_runtime_1.jsx)("label", { children: "Edit Cookies" }), (0, jsx_runtime_1.jsx)("div", { className: "_oadmin_dialog_grid_3", children: cookies.map(([name, value, options, original], i) => value === null && original !== null ? null : ((0, jsx_runtime_1.jsxs)(react_1.Fragment, { children: [(0, jsx_runtime_1.jsxs)("label", { children: [name, " ", `${value};${options}` !== original && "*"] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("input", { className: "input_o_with_x", type: "text", value: value ?? "", onChange: (event) => setCookies(cookies.map((element, j) => i === j
                                        ? [
                                            element[0],
                                            event.target.value,
                                            element[2],
                                            element[3],
                                        ]
                                        : element)) }), (0, jsx_runtime_1.jsx)("span", { className: "input_o_x", onClick: () => setCookies(cookies.map((e, j) => i === j ? [e[0], null, e[2], ""] : e)), children: "\u2716" })] }), (0, jsx_runtime_1.jsx)("div", { onClick: async () => {
                                const newOptions = await (0, AsyncComponents_1.default)(EditCookieOptions, { serializedOptions: options }, "modals");
                                if (!newOptions) {
                                    return;
                                }
                                setCookies(cookies.map((element, j) => i === j
                                    ? [element[0], element[1], newOptions, element[3]]
                                    : element));
                            }, children: (0, jsx_runtime_1.jsx)("svg", { width: "32", height: "32", viewBox: "0 0 16 16", children: (0, jsx_runtime_1.jsx)("path", { fill: "currentColor", d: "M3 9.5a1.5 1.5 0 1 1 0-3a1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3a1.5 1.5 0 0 1 0 3zm5 0a1.5 1.5 0 1 1 0-3a1.5 1.5 0 0 1 0 3z" }) }) })] }, name))) }), (0, jsx_runtime_1.jsxs)("div", { className: "input_o_new_item", children: [(0, jsx_runtime_1.jsx)("input", { list: "_oadminMeta", placeholder: "new cookie", ref: ref, onKeyDown: (event) => event.key === "Enter" && addNewCookie() }), (0, jsx_runtime_1.jsx)("button", { className: "button_o", onClick: addNewCookie, children: "new Cookie" })] }), (0, jsx_runtime_1.jsx)("div", { children: changed && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("button", { className: "button_o", onClick: reset, children: "Reset" }), (0, jsx_runtime_1.jsx)("button", { className: "button_o", onClick: () => {
                                updatePageConfig({
                                    ...pageConfig,
                                    cookies: cookies
                                        .filter((e) => e[1] !== null)
                                        .map((e) => [e[0], e[1], JSON.parse(e[2])]),
                                });
                            }, children: "Apply" })] })) })] }));
}
exports.default = EditCookies;
//# sourceMappingURL=EditCookies.dynamic.js.map