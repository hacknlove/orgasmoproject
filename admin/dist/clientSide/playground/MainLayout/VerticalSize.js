"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
function VerticalSize() {
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
            const PlaygroundRender_o = document.getElementById('PlaygroundRender_o');
            if (!PlaygroundRender_o) {
                return;
            }
            PlaygroundRender_o.style.flexGrow = '0';
            PlaygroundRender_o.style.height = `${event.clientY - 85}px`;
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
    }, [ref.current]);
    return (0, jsx_runtime_1.jsx)("div", { ref: ref, id: "verticalSize" });
}
exports.default = VerticalSize;
//# sourceMappingURL=VerticalSize.js.map