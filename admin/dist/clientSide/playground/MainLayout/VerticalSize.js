"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const configurationModes = {
    rows: {
        dimenstion: "height",
        coordinate: "clientY",
        substract: "top",
    },
    columns: {
        dimenstion: "width",
        coordinate: "clientX",
        substract: "left",
    },
};
function VerticalSize({ mode, target }) {
    const ref = (0, react_1.useRef)();
    (0, react_1.useEffect)(() => {
        if (!ref.current) {
            return;
        }
        function mouseDown() {
            const iframe = document.getElementById("pageRender_iframe");
            if (!iframe) {
                return;
            }
            window.addEventListener("mousemove", mouseMove);
            window.addEventListener("mouseup", mouseUp);
            iframe.style.pointerEvents = "none";
        }
        function mouseUp() {
            window.removeEventListener("mousemove", mouseMove);
            window.removeEventListener("mouseup", mouseUp);
            const iframe = document.getElementById("pageRender_iframe");
            if (iframe) {
                iframe.style.pointerEvents = "";
            }
        }
        function mouseMove(event) {
            const PlaygroundRender_o = document.getElementById(target);
            if (!PlaygroundRender_o) {
                return;
            }
            const bounding = PlaygroundRender_o.getBoundingClientRect();
            const config = configurationModes[mode];
            PlaygroundRender_o.style.flexGrow = "0";
            PlaygroundRender_o.style[config.dimenstion] = `${event[config.coordinate] - bounding[config.substract]}px`;
        }
        ref.current.addEventListener("mousedown", mouseDown);
        return () => {
            window.removeEventListener("mouseout", mouseUp);
            window.removeEventListener("mousemove", mouseMove);
            window.removeEventListener("mousemove", mouseMove);
            window.removeEventListener("mouseup", mouseUp);
            if (!ref.current) {
                return;
            }
            ref.current.removeEventListener("mousedown", mouseDown);
        };
    }, [ref.current, mode]);
    return ((0, jsx_runtime_1.jsx)("div", { ref: ref, id: "verticalSize", className: `verticalSize_${mode}_o` }));
}
exports.default = VerticalSize;
//# sourceMappingURL=VerticalSize.js.map