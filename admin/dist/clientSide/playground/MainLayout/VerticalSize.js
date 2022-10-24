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
            if (!document.getElementById("pageRender_iframe")) {
                return;
            }
            window.addEventListener("mousemove", mouseMove);
            window.addEventListener("mouseup", mouseUp);
            document.getElementById("pageRender_iframe").style.pointerEvents = "none";
        }
        function mouseUp() {
            window.removeEventListener("mousemove", mouseMove);
            document.getElementById("pageRender_iframe").style.pointerEvents = "";
        }
        function mouseMove(event) {
            const iframe = ref.current.previousElementSibling;
            iframe.style.height = `${event.clientY - 85}px`;
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