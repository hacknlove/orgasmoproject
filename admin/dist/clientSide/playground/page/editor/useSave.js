"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("next/router");
const react_1 = require("react");
const AsyncComponents_1 = require("@orgasmo/orgasmo/AsyncComponents");
const Alert_1 = require("../../../modals/Alert");
const ADMIN_UPSERT_PAGE_CONFIG_ENDPOINT = "/api/_oadmin/page";
function useSave({ files, editPageConfig }) {
    const router = (0, router_1.useRouter)();
    return (0, react_1.useCallback)(async (file) => {
        if (!file.edit.isDirty) {
            return;
        }
        const pageConfig = editPageConfig.prepareToSend();
        const response = await fetch(ADMIN_UPSERT_PAGE_CONFIG_ENDPOINT, {
            method: "PUT",
            headers: {
                "content-type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({ pageConfig }),
        })
            .then((r) => r.json())
            .catch((error) => ({ error }));
        if (typeof response.error === "string") {
            return (0, AsyncComponents_1.default)(Alert_1.default, { title: "Error", text: response.error }, "playgroundModal_o");
        }
        if (response.error) {
            return (0, AsyncComponents_1.default)(Alert_1.default, response.error, "playgroundModal_o");
        }
        router.push({
            pathname: router.pathname,
            query: {
                ...router.query,
                pageId: pageConfig.pageId,
            },
        });
    }, [files.current, router.query.component, router.query.story, editPageConfig]);
}
exports.default = useSave;
//# sourceMappingURL=useSave.js.map