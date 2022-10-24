"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const AsyncComponents_1 = require("@orgasmo/orgasmo/AsyncComponents");
const Alert_1 = require("../../modals/Alert");
const router_1 = require("next/router");
function PlaygroundDeleteItem_o({ label, action }) {
    const router = (0, router_1.useRouter)();
    async function deleteStory() {
        const response = await fetch(action, {
            method: "DELETE",
            credentials: "include",
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
        router.push("/playground");
    }
    return ((0, jsx_runtime_1.jsx)("button", { id: "PlaygroundDeleteItem_o", className: "button_o", onClick: deleteStory, children: label }));
}
exports.default = PlaygroundDeleteItem_o;
//# sourceMappingURL=PlaygroundDeleteItem_o.dynamic.js.map