"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@orgasmo/dynamicstate/react");
const AsyncComponents_1 = require("@orgasmo/orgasmo/AsyncComponents");
const Alert_1 = require("../../modals/Alert");
const updateNavDelete_1 = require("./updateNavDelete");
function DeleteItem({ filePath }) {
    const dynamicState = (0, react_1.useDynamicState)();
    async function deleteStory() {
        const fileDescriptor = await fetch(`/api/_oadmin/playGround/deleteFile`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ filePath }),
        })
            .then((r) => r.json())
            .catch((error) => ({ error }));
        if (typeof fileDescriptor.error === "string") {
            return (0, AsyncComponents_1.default)(Alert_1.default, { title: "Error", text: fileDescriptor.error }, "playgroundModal_o");
        }
        if (fileDescriptor.error) {
            console.error(fileDescriptor.error);
            return (0, AsyncComponents_1.default)(Alert_1.default, fileDescriptor.error, "playgroundModal_o");
        }
        (0, updateNavDelete_1.default)({ dynamicState, fileDescriptor });
        const tabs = dynamicState.getValue("var://tabs_o");
        dynamicState.setValue("var://tabs_o", tabs.filter((path) => path !== filePath));
        dynamicState.setValue("var://activeFilepath_o", tabs[tabs.length - 2] ?? null);
        dynamicState.setValue(`var://file${filePath}?content`, "");
        dynamicState.setValue(`var://file${filePath}?original`, "");
    }
    if (!filePath) {
        return null;
    }
    if (filePath === "/site/config") {
        return null;
    }
    return ((0, jsx_runtime_1.jsx)("button", { id: "PlaygroundDeleteItem_o", className: "button_o", onClick: deleteStory, children: "Delete" }));
}
exports.default = DeleteItem;
//# sourceMappingURL=DeleteItem.js.map