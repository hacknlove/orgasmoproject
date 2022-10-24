"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
const ADMIN_GET_PAGE_CONFIG_ENDPOINT = "/api/_oadmin/page/expand";
function useExpandPage({ pageConfig, pathSample, parsedPath }) {
    const [expandedConfigPage, setExpandedPageConfig] = (0, react_1.useState)();
    (0, react_1.useEffect)(() => {
        if (!pageConfig) {
            return;
        }
        if (pageConfig.patternPath && !pathSample) {
            setExpandedPageConfig({
                areas: {},
            });
            return;
        }
        fetch(ADMIN_GET_PAGE_CONFIG_ENDPOINT, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                pageConfig,
                resolvedUrl: pathSample,
                parsedPath,
            }),
        })
            .then((r) => r.json())
            .then((expandedPageConfig) => setExpandedPageConfig(expandedPageConfig.props));
    }, [pageConfig, pathSample, setExpandedPageConfig]);
    return expandedConfigPage;
}
exports.default = useExpandPage;
//# sourceMappingURL=useExpandPage.js.map