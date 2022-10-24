"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("next/router");
const react_1 = require("react");
const AsyncComponents_1 = require("@orgasmo/orgasmo/AsyncComponents");
const SaveAsInput_1 = require("../../../modals/SaveAsInput");
const Alert_1 = require("../../../modals/Alert");
const ADMIN_UPSERT_STORY_CONFIG_ENDPOINT = "/api/_oadmin/story";
function useSave({ files, description, itemConfig }) {
    const router = (0, router_1.useRouter)();
    return (0, react_1.useCallback)(async (file) => {
        if (!file.edit.isDirty) {
            return;
        }
        const storyName = await (0, AsyncComponents_1.default)(SaveAsInput_1.default, {
            title: `Save ${file.label}`,
            label: "Story",
            defaultValue: router.query.story,
        }, "playgroundModal_o");
        if (!storyName) {
            return;
        }
        const response = await fetch(ADMIN_UPSERT_STORY_CONFIG_ENDPOINT, {
            method: "POST",
            headers: {
                "content-type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                storyConfig: {
                    component: router.query.component,
                    story: storyName,
                    description,
                    itemConfig,
                    [file.field]: file.edit.prepareToSend(),
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
        router.push({
            pathname: router.pathname,
            query: {
                ...router.query,
                story: storyName,
            },
        });
    }, [files.current, router.query.component, router.query.story]);
}
exports.default = useSave;
//# sourceMappingURL=useSave.js.map