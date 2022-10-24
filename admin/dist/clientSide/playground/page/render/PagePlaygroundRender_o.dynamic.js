"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const useExpandPage_1 = require("./useExpandPage");
function setValues({ sharedState, props }) {
    for (const key of Array.from(sharedState.resources.keys())) {
        if (key === "var://DComponent") {
            continue;
        }
        sharedState.setValue(key, null);
    }
    sharedState.setValue("var://layout", props.layout);
    const areasNames = [];
    for (const areaName in props.areas) {
        areasNames.push(areaName);
        sharedState.setValue(`var://area/${areaName}`, props.areas[areaName]);
    }
    sharedState.setValue("var://areasNames", areasNames);
}
function PagePlaygroundRender({ pageConfig, pathSample, parsedPath, }) {
    const ref = (0, react_1.useRef)();
    (0, react_1.useEffect)(() => {
        window.thisIframe = ref;
    }, []);
    const sharedState = (0, react_1.useRef)();
    const props = (0, useExpandPage_1.default)({ pageConfig, pathSample, parsedPath });
    (0, react_1.useEffect)(() => {
        function processMessage(message) {
            if (message.data !== "sharedStateReady") {
                return;
            }
            const current = ref.current.contentWindow.sharedState;
            sharedState.current = current;
            setTimeout(() => {
                setValues({ props, sharedState: current });
            }, 100);
        }
        window.addEventListener("message", processMessage);
        return () => window.removeEventListener("message", processMessage);
    }, [props]);
    (0, react_1.useEffect)(() => {
        if (sharedState.current) {
            setValues({ props, sharedState: sharedState.current });
        }
    }, [props]);
    return ((0, jsx_runtime_1.jsx)("div", { id: "PlaygroundRender_o", children: (0, jsx_runtime_1.jsx)("iframe", { ref: ref, id: "pageRender_iframe", src: props && "/playground?empty=true" }) }));
}
exports.default = PagePlaygroundRender;
//# sourceMappingURL=PagePlaygroundRender_o.dynamic.js.map