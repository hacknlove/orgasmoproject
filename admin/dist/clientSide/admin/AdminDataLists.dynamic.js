"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminCSSVarsDataList = exports.AdminDriversDataList = exports.AdminComponentsDataList = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
function AdminComponentsDataList({ Components, filter = undefined, id = "_oadminComponents", }) {
    const list = (0, react_1.useMemo)(() => Object.keys(Components), [Components]);
    return (0, jsx_runtime_1.jsx)(AdminDataList, { list: list, filter: filter, id: id });
}
exports.AdminComponentsDataList = AdminComponentsDataList;
function AdminDriversDataList({ driverMethods, filter = undefined, id = "_oadminDrivers", }) {
    return (0, jsx_runtime_1.jsx)(AdminDataList, { list: driverMethods, filter: filter, id: id });
}
exports.AdminDriversDataList = AdminDriversDataList;
function AdminCSSVarsDataList({ filter = undefined, id = "_oadminCSSVars", }) {
    const list = (0, react_1.useMemo)(() => {
        const varsSet = new Set();
        for (const css of Array.from(document.styleSheets)) {
            if (css.href && !css.href.includes(window.location.origin)) {
                continue;
            }
            for (const rule of Array.from(css.cssRules)) {
                for (const [, match] of rule.cssText.matchAll(/var\s*\(\s*--([\w-]+)/g)) {
                    varsSet.add(match);
                }
            }
        }
        const varsArray = Array.from(varsSet);
        varsArray.sort();
        return varsArray;
    }, []);
    return (0, jsx_runtime_1.jsx)(AdminDataList, { list: list, filter: filter, id: id });
}
exports.AdminCSSVarsDataList = AdminCSSVarsDataList;
function AdminDataList({ list, filter, id, }) {
    const filtered = (0, react_1.useMemo)(() => {
        if (!filter) {
            return list;
        }
        return list.filter(filter);
    }, [list, filter]);
    return ((0, jsx_runtime_1.jsx)(jsx_runtime_1.Fragment, { children: (0, jsx_runtime_1.jsx)("datalist", { id: id, children: filtered.map((name) => ((0, jsx_runtime_1.jsx)("option", { value: name }, name))) }) }));
}
exports.default = AdminDataList;
//# sourceMappingURL=AdminDataLists.dynamic.js.map