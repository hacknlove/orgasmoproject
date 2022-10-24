"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const AdminContext_1 = require("./AdminContext");
const react_1 = require("react");
function ChoosePageId() {
    const { pageConfigIds, setSelectedPageId, pageConfig } = (0, react_1.useContext)(AdminContext_1.default);
    const onChange = (0, react_1.useCallback)((event) => {
        setSelectedPageId(event.target.value);
    }, [setSelectedPageId]);
    return ((0, jsx_runtime_1.jsx)("select", { className: "_oadmin_menu_item", value: pageConfig?.pageId, onChange: onChange, children: pageConfigIds?.map((key) => ((0, jsx_runtime_1.jsx)("option", { value: key, children: key }, key))) }));
}
exports.default = ChoosePageId;
//# sourceMappingURL=ChoosePageId.dynamic.js.map