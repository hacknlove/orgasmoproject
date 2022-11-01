"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const DComponent_1 = require("@orgasmo/orgasmo/DComponent");
const react_1 = require("react");
const Admin_dynamic_1 = require("./Admin.dynamic");
const ADMIN_GET_PAGE_CONFIG_ENDPOINT = "/api/_oadmin/page/expand";
function AdminFactory({ Components, Page }) {
    const AdminPage = ({ pageConfigs, resolvedUrl, adminPageConfig, driverMethods, }) => {
        const [selectedPageId, setSelectedPageId] = (0, react_1.useState)(Object.keys(pageConfigs)[0]);
        const [editablePageConfig, setEditablePageConfig] = (0, react_1.useState)(pageConfigs[selectedPageId]);
        const [expandedPageConfig, setExpandedPageConfig] = (0, react_1.useState)();
        (0, react_1.useEffect)(() => {
            setSelectedPageId(Object.keys(pageConfigs)[0]);
        }, [resolvedUrl]);
        (0, react_1.useEffect)(() => {
            if (!editablePageConfig) {
                return;
            }
            fetch(ADMIN_GET_PAGE_CONFIG_ENDPOINT, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({
                    pageConfig: editablePageConfig,
                    resolvedUrl,
                }),
            })
                .then((r) => r.json())
                .then((expandedPageConfig) => setExpandedPageConfig(expandedPageConfig.props));
        }, [editablePageConfig, resolvedUrl, setExpandedPageConfig]);
        (0, react_1.useEffect)(() => {
            setEditablePageConfig(pageConfigs[selectedPageId]);
        }, [pageConfigs, selectedPageId]);
        const adminRendered = (0, react_1.useMemo)(() => ((0, jsx_runtime_1.jsx)(Admin_dynamic_1.Admin, { adminAreas: adminPageConfig.areas, Components: Components, originalPageConfig: pageConfigs[selectedPageId], pageConfig: editablePageConfig, pageConfigIds: Object.keys(pageConfigs), setSelectedPageId: setSelectedPageId, setPageConfig: setEditablePageConfig, driverMethods: driverMethods })), [editablePageConfig]);
        const pageRendered = (0, react_1.useMemo)(() => expandedPageConfig && (0, jsx_runtime_1.jsx)(Page, { ...expandedPageConfig }), [expandedPageConfig]);
        return (0, react_1.useMemo)(() => {
            if (adminPageConfig.layout?.name) {
                return ((0, jsx_runtime_1.jsx)(DComponent_1.default, { type: adminPageConfig.layout?.name, props: {
                        admin: adminRendered,
                        page: pageRendered,
                    }, Components: Components }));
            }
            return ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [adminRendered, pageRendered] }));
        }, [expandedPageConfig, editablePageConfig]);
    };
    return AdminPage;
}
exports.default = AdminFactory;
//# sourceMappingURL=AdminFactory.js.map