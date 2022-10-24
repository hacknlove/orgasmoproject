"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
function useScroll({ onHideBottom, onHideTop, onShowBottom, onShowTop, threshold, wait, }) {
    const ref = (0, react_1.useRef)(null);
    const scroll = (0, react_1.useRef)(null);
    const height = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        if (!ref.current)
            return;
        function handler() {
            if (!ref.current || wait.working)
                return;
            const currentScroll = window.scrollY;
            const currentHeight = window.innerHeight;
            const scrollDiff = currentScroll - scroll.current ||
                currentHeight - height.current;
            scroll.current = currentScroll;
            height.current = currentHeight;
            if (isNaN(scrollDiff)) {
                return;
            }
            const containerRect = ref.current.getBoundingClientRect();
            if (containerRect.y > currentHeight) {
                return;
            }
            if (containerRect.y + containerRect.height < 0) {
                return;
            }
            const firstElement = ref.current.firstElementChild;
            const lastElement = ref.current.lastElementChild;
            if (!firstElement || !lastElement)
                return;
            const firstElementClientRect = firstElement.getBoundingClientRect();
            const lastElementClientRect = lastElement.getBoundingClientRect();
            if (scrollDiff > 0) {
                if (onHideTop &&
                    firstElementClientRect.y + firstElementClientRect.height + threshold <
                        0) {
                    wait.working = true;
                    window.requestAnimationFrame(() => onHideTop(firstElement));
                }
                if (onShowBottom &&
                    lastElementClientRect.y - threshold < currentHeight) {
                    wait.working = true;
                    window.requestAnimationFrame(onShowBottom);
                }
            }
            if (scrollDiff < 0) {
                if (onShowTop &&
                    firstElementClientRect.y + threshold > 0 &&
                    firstElementClientRect.y - threshold < currentHeight) {
                    wait.working = true;
                    window.requestAnimationFrame(onShowTop);
                }
                if (onHideBottom &&
                    lastElementClientRect.y - lastElementClientRect.height - threshold >
                        currentHeight &&
                    firstElementClientRect.y + firstElementClientRect.height + threshold <
                        currentHeight) {
                    wait.working = true;
                    window.requestAnimationFrame(() => onHideBottom(lastElement));
                }
            }
        }
        window.addEventListener("scroll", handler, { passive: true });
        window.addEventListener("resize", handler, { passive: true });
        return () => {
            window.removeEventListener("scroll", handler);
            window.removeEventListener("resize", handler);
        };
    }, [onHideBottom, onHideTop, onShowBottom, onShowTop, ref]);
    return ref;
}
exports.default = useScroll;
//# sourceMappingURL=useScroll.js.map