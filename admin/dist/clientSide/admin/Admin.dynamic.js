"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Admin = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const Area_1 = require("@orgasmo/orgasmo/Area");
const AdminContext_1 = require("./AdminContext");
const equal = require("fast-deep-equal");
const router_1 = require("next/router");
const AsyncComponents_1 = require("@orgasmo/orgasmo/AsyncComponents");
const Save_1 = require("./Save");
function Admin({ adminAreas, DComponent, Components, pageConfig, setPageConfig, driverMethods, originalPageConfig, pageConfigIds, setSelectedPageId, }) {
    const isDirty = (0, react_1.useMemo)(() => !equal(pageConfig, originalPageConfig), [pageConfig, originalPageConfig]);
    const [menuIsActive, setMenuIsActive] = (0, react_1.useState)(true);
    const [adminArea, setAdminArea] = (0, react_1.useState)("start");
    const updatePageConfig = (0, react_1.useCallback)((pageConfig) => {
        window.history.pushState({ pageConfig }, "");
        setPageConfig(pageConfig);
    }, [setPageConfig]);
    const chooseMenu = (0, react_1.useCallback)((areaName) => {
        setAdminArea(areaName);
        window.history.pushState({
            ...window.history.state,
            pageConfig,
        }, "", `#${areaName === "start" ? "" : areaName}`);
    }, [setAdminArea]);
    (0, react_1.useEffect)(() => {
        if (!menuIsActive) {
            return;
        }
        function makeInactive(event) {
            let element = event.target;
            while (element) {
                if (["A", "BUTTON", "SELECT", "OPTION", "INPUT"].includes(element.tagName)) {
                    return;
                }
                element = element.parentElement;
            }
            setMenuIsActive(false);
        }
        window.addEventListener("click", makeInactive);
        return () => {
            window.removeEventListener("click", makeInactive);
        };
    }, [menuIsActive]);
    (0, react_1.useEffect)(() => {
        function keepAdminPaths(url) {
            if (url.startsWith("/admin")) {
                return;
            }
            router_1.default.events.emit("routeChangeError");
            router_1.default.replace("/admin" + url);
            throw "Ignore this error.";
        }
        router_1.default.events.on("routeChangeStart", keepAdminPaths);
        () => router_1.default.events.off("routeChangeStart", keepAdminPaths);
    }, [menuIsActive]);
    (0, react_1.useEffect)(() => {
        window.history.replaceState({
            ...window.history.state,
            pageConfig,
        }, "");
        setAdminArea(window.location.hash.substring(1) || "start");
        function popstateHandler({ state }) {
            if (state && state?.pageConfig) {
                setPageConfig(state.pageConfig);
            }
            if (window.location.pathname)
                setAdminArea(window.location.hash.substring(1) || "start");
        }
        window.addEventListener("popstate", popstateHandler);
        return () => window.removeEventListener("popstate", popstateHandler);
    }, []);
    return ((0, jsx_runtime_1.jsx)("div", { id: "_oadmin", onMouseEnter: () => setMenuIsActive(true), onClick: (event) => {
            event.stopPropagation();
            setMenuIsActive(true);
        }, children: (0, jsx_runtime_1.jsxs)(AdminContext_1.default.Provider, { value: {
                pageConfig,
                originalPageConfig,
                isDirty,
                updatePageConfig,
                chooseMenu,
                DComponent,
                Components,
                driverMethods,
                pageConfigIds,
                setSelectedPageId,
            }, children: [(0, jsx_runtime_1.jsx)(AsyncComponents_1.AsyncComponents, { area: "playgroundModal_o" }), (0, jsx_runtime_1.jsxs)("div", { id: "_oadmin_menu", className: menuIsActive ? "_oadmin_menu_active" : "", children: [(0, jsx_runtime_1.jsxs)("div", { id: "_oadmin_menu_path", children: [(0, jsx_runtime_1.jsxs)("span", { children: [pageConfig?.exactPath ?? pageConfig?.patternPath, " ", isDirty && "*"] }), adminArea !== "start" && ((0, jsx_runtime_1.jsx)("button", { className: "button_o", onClick: () => {
                                        chooseMenu("start");
                                    }, children: "\uD83E\uDC04" }))] }), Components[adminArea] ? ((0, jsx_runtime_1.jsx)(DComponent, { type: adminArea, props: {} })) : ((0, jsx_runtime_1.jsx)(Area_1.RenderArea, { area: adminAreas[adminArea], DComponent: DComponent })), (0, jsx_runtime_1.jsx)(Save_1.default, {})] })] }) }));
}
exports.Admin = Admin;
//# sourceMappingURL=Admin.dynamic.js.map