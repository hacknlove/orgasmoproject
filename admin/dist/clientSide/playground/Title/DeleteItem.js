"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const AsyncComponents_1 = require("@orgasmo/orgasmo/AsyncComponents");
const Alert_1 = require("../../modals/Alert");
function DeleteItem({ filePath }) {
    async function deleteStory() {
        const response = await fetch(`/api/_oadmin/playGround/deleteFile`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ filePath }),
        })
            .then((r) => r.json())
            .catch((error) => ({ error }));
        if (typeof response.error === "string") {
            return (0, AsyncComponents_1.default)(Alert_1.default, { title: "Error", text: response.error }, "playgroundModal_o");
        }
        if (response.error) {
            console.error(response.error);
            return (0, AsyncComponents_1.default)(Alert_1.default, response.error, "playgroundModal_o");
        }
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