"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@orgasmo/dynamicstate/react");
const react_2 = require("react");
const useExpandPage_1 = require("./useExpandPage");
function Render() {
    const ref = (0, react_2.useRef)();
    const [sharedState, setSharedState] = (0, react_2.useState)(null);
    const [filePath] = (0, react_1.useDynamicValue)("var://activeFilepath_o");
    const [fileContent] = (0, react_1.useDynamicValue)(`var://file${filePath}?content`);
    const [pathParams] = (0, react_1.useDynamicValue)(`var://file${filePath}?params`);
    (0, useExpandPage_1.default)({
        sharedState,
        filePath,
        fileContent,
        pathParams,
    });
    (0, react_2.useEffect)(() => {
        if (!ref.current) {
            return;
        }
        setSharedState(null);
        ref.current.contentWindow.location.reload();
    }, [filePath]);
    (0, react_2.useEffect)(() => {
        if (!ref.current) {
            return;
        }
        function processMessage(message) {
            if (message.data !== "sharedStateReady") {
                return;
            }
            setSharedState(ref.current.contentWindow.sharedState);
        }
        window.addEventListener("message", processMessage);
        return () => window.removeEventListener("message", processMessage);
    }, [ref.current]);
    return ((0, jsx_runtime_1.jsx)("div", { id: "PlaygroundRender_o", children: (0, jsx_runtime_1.jsx)("iframe", { ref: ref, id: "pageRender_iframe", src: "/playground?empty=true" }) }));
}
exports.default = Render;
//# sourceMappingURL=Render.js.map