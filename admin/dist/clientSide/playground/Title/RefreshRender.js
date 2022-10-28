"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const IcBaselineRefresh_1 = require("../../icons/IcBaselineRefresh");
function refresh() {
    const iframe = document.getElementById("pageRender_iframe");
    if (!iframe?.contentWindow) {
        return;
    }
    if (iframe.contentWindow.location.pathname === "/playground" &&
        iframe.contentWindow.location.search === "?empty") {
        iframe.contentWindow.location.reload();
        return;
    }
    iframe.contentWindow.location = "/playground?empty=true";
}
function RefreshRender() {
    return (0, jsx_runtime_1.jsx)(IcBaselineRefresh_1.default, { className: "icon_o", onClick: refresh });
}
exports.default = RefreshRender;
//# sourceMappingURL=RefreshRender.js.map