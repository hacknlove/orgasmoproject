"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const AdminContext_1 = require("./AdminContext");
const react_1 = require("react");
const AsyncComponents_1 = require("@orgasmo/orgasmo/AsyncComponents");
const Alert_1 = require("../modals/Alert");
const router_1 = require("next/router");
const SaveAsInput_1 = require("../modals/SaveAsInput");
const ADMIN_UPDATE_PAGE_CONFIG_ENDPOINT = "/api/_oadmin/updatePageConfig";
const ADMIN_NEW_PAGE_CONFIG_ENDPOINT = "/api/_oadmin/newPageConfig";
function forceReload() {
    router_1.default.replace(`/admin/_back?to=${encodeURIComponent(router_1.default.asPath)}`);
}
function Save() {
    const { isDirty, pageConfig, updatePageConfig, originalPageConfig } = (0, react_1.useContext)(AdminContext_1.default);
    const save = (0, react_1.useCallback)(async () => {
        const response = await fetch(ADMIN_UPDATE_PAGE_CONFIG_ENDPOINT, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                pageConfig,
            }),
        })
            .then((r) => r.json())
            .catch((error) => ({ error }));
        if (typeof response.error === "string") {
            return (0, AsyncComponents_1.default)(Alert_1.default, { title: "Error", text: response.error }, "playgroundModal_o");
        }
        if (response.error) {
            return (0, AsyncComponents_1.default)(Alert_1.default, response.error, "playgroundModal_o");
        }
        if (response.ok) {
            forceReload();
        }
    }, [pageConfig]);
    const saveAs = (0, react_1.useCallback)(async () => {
        const pageId = await (0, AsyncComponents_1.default)(SaveAsInput_1.default, { label: "pageId" }, "playgroundModal_o");
        if (!pageId) {
            return;
        }
        const response = await fetch(ADMIN_NEW_PAGE_CONFIG_ENDPOINT, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                pageConfig: {
                    ...pageConfig,
                    pageId,
                },
            }),
        })
            .then((r) => r.json())
            .catch((error) => ({ error }));
        if (typeof response.error === "string") {
            return (0, AsyncComponents_1.default)(Alert_1.default, { title: "Error", text: response.error }, "playgroundModal_o");
        }
        if (response.error) {
            return (0, AsyncComponents_1.default)(Alert_1.default, response.error, "playgroundModal_o");
        }
        (0, AsyncComponents_1.default)(Alert_1.default, {
            title: "Saved",
            text: `The pageConfig has been save with the pageId ${pageId}`,
        }, "playgroundModal_o");
    }, [pageConfig]);
    if (!isDirty) {
        return null;
    }
    return ((0, jsx_runtime_1.jsx)("div", { className: "_oadmin_save_menu", children: (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("button", { className: "button_o", onClick: () => updatePageConfig(originalPageConfig), children: "Reset" }), (0, jsx_runtime_1.jsx)("button", { className: "button_o", onClick: async () => {
                        await navigator.clipboard.writeText(JSON.stringify(pageConfig, null, 2));
                        (0, AsyncComponents_1.default)(Alert_1.default, { title: "Copied to clipboard" }, "playgroundModal_o");
                    }, children: "Copy" }), (0, jsx_runtime_1.jsx)("button", { className: "button_o", onClick: save, children: "Save" }), (0, jsx_runtime_1.jsx)("button", { className: "button_o", onClick: saveAs, children: "Save as..." })] }) }));
}
exports.default = Save;
//# sourceMappingURL=Save.js.map