"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const useItems_1 = require("./useItems");
function getTranslateX(ref) {
    return (parseInt((ref.current.style.transform.match(/translateX\((-?\d+\.?\d*)px\)/) ||
        [])[1]) || 0);
}
function getActualCardWidth(ref) {
    if (!ref.current) {
        return 1;
    }
    return (ref.current.querySelector(".listItem").getBoundingClientRect().width || 1);
}
function getCardsInView(ref) {
    if (!ref.current) {
        return 1;
    }
    const actualCardWidth = getActualCardWidth(ref);
    return Math.max(1, Math.floor(0.1 + ref.current.clientWidth / actualCardWidth));
}
function Slider({ intro, introWidth = 0, Component, items: itemsProp, src: srcProps, ButtonNext, ButtonPrev, children, ...other }) {
    const { items, hasMore, getMoreItems } = (0, useItems_1.default)({
        items: itemsProp,
        src: srcProps,
    });
    const ref = (0, react_1.useRef)();
    const [minI, setMinI] = (0, react_1.useState)(0);
    const [maxI, setMaxI] = (0, react_1.useState)(9);
    const [showPrev, setShowPrev] = (0, react_1.useState)(false);
    const [showNext, setShowNext] = (0, react_1.useState)(true);
    (0, react_1.useEffect)(() => {
        async function updateCardsInView() {
            if (!ref.current) {
                return;
            }
            const newMaxi = updateMaxMin();
            if (newMaxi > maxI) {
                await getMoreItems(newMaxi - maxI);
                updateMaxMin();
            }
        }
        updateCardsInView();
        window.addEventListener("resize", updateCardsInView);
        return () => window.removeEventListener("resize", updateCardsInView);
    }, [ref.current, maxI]);
    (0, react_1.useEffect)(() => {
        if (!ref.current) {
            return () => undefined;
        }
        if (window.ontouchstart === undefined) {
            ref.current.style.transition = "transform .75s";
            return;
        }
        ref.current.style.transition = "none";
        let initialX = 0;
        let initialTranslateX = 0;
        let preventClick = false;
        function onMouseDown(event) {
            initialX = event.changedTouches[0].clientX;
            initialTranslateX = getTranslateX(ref);
            currY = event.changedTouches[0].clientY;
            currX = event.changedTouches[0].clientX;
        }
        function onMouseUp() {
            initialX = null;
            setTimeout(() => (preventClick = false), 100);
            updateMaxMin();
            if (items.length < maxI + 10) {
                getMoreItems(20);
            }
            function inertia(speed) {
                if (Math.abs(speed) < 0.1) {
                    return;
                }
                const translateX = Math.min(0, getTranslateX(ref) + speed);
                if (ref.current) {
                    ref.current.style.transform = `translateX(${translateX}px)`;
                }
                updateMaxMin();
                setTimeout(() => inertia(speed * 0.9), 10);
            }
            inertia(currX - prevX);
            document.body.style.overflowY = "scroll";
            mode = null;
        }
        let prevX;
        let currX;
        let prevY;
        let currY;
        let mode;
        function onMouseMove(event) {
            if (mode === "scroll") {
                return;
            }
            if (initialX === null) {
                return;
            }
            prevX = currX;
            currX = event.changedTouches[0].clientX;
            if (!mode) {
                prevY = currY;
                currY = event.changedTouches[0].clientY;
                if (Math.abs(currX - prevX) < Math.abs(currY - prevY)) {
                    mode = "scroll";
                    prevX = 0;
                    currX = 0;
                }
                else {
                    document.body.style.overflowY = "hidden";
                    mode = "swipe";
                }
                return;
            }
            const delta = event.changedTouches[0].clientX - initialX;
            if (Math.abs(delta) > 10) {
                preventClick = true;
            }
            const translateX = Math.min(0, initialTranslateX + delta);
            if (ref.current) {
                ref.current.style.transform = `translateX(${translateX}px)`;
            }
            event.isSwiping = true;
        }
        function onclick(event) {
            if (preventClick) {
                event.preventDefault();
                event.stopPropagation();
            }
        }
        ref.current.addEventListener("click", onclick);
        ref.current.addEventListener("touchstart", onMouseDown);
        ref.current.addEventListener("touchend", onMouseUp);
        ref.current.addEventListener("touchcancel", onMouseUp);
        ref.current.addEventListener("touchmove", onMouseMove);
        return () => {
            if (!ref.current) {
                return;
            }
            ref.current.removeEventListener("touchstart", onMouseDown);
            ref.current.removeEventListener("touchend", onMouseUp);
            ref.current.removeEventListener("touchcancel", onMouseUp);
            ref.current.removeEventListener("touchmove", onMouseMove);
            ref.current.removeEventListener("click", onclick);
        };
    }, [ref.current, items, maxI, minI]);
    function updateMaxMin() {
        if (!ref.current)
            return maxI;
        const cardsInView = getCardsInView(ref);
        const targetTranslateX = getTranslateX(ref) + introWidth;
        const actualCardWidth = getActualCardWidth(ref);
        const cardsMoved = Math.floor(Math.abs(targetTranslateX) / actualCardWidth);
        const minI = Math.max(0, cardsMoved - cardsInView);
        const newMaxi = Math.min(items.length + cardsInView + 1, cardsMoved + cardsInView * 2 + 1);
        setMinI(minI);
        setMaxI(newMaxi);
        return Math.min(items.length + cardsInView + 1, cardsMoved + cardsInView * 2 + 1);
    }
    async function nextPreload() {
        if (!hasMore) {
            return;
        }
        const cardsInView = getCardsInView(ref);
        if (items.length < maxI + cardsInView + 1) {
            await getMoreItems(cardsInView);
        }
    }
    async function next() {
        if (!ref.current) {
            return;
        }
        const currentTranslateX = getTranslateX(ref) + introWidth;
        const actualCardWidth = getActualCardWidth(ref);
        const cardsInView = getCardsInView(ref);
        await nextPreload();
        const max = -actualCardWidth *
            (items.length - Math.floor(ref.current.clientWidth / actualCardWidth)) +
            (ref.current.clientWidth % actualCardWidth) -
            introWidth * 2;
        const targetTranslateX = Math.max(currentTranslateX - actualCardWidth * cardsInView - introWidth * 2, max);
        ref.current.style.transform = `translateX(${targetTranslateX + introWidth}px)`;
        setShowNext(false);
        setShowPrev(false);
        nextPreload();
        await new Promise((resolve) => setTimeout(resolve, 1000));
        updateMaxMin();
        if (targetTranslateX !== max || hasMore) {
            setShowNext(true);
        }
        setShowPrev(true);
    }
    function prev() {
        if (!ref.current) {
            return;
        }
        const cardsInView = getCardsInView(ref);
        const currentTranslateX = getTranslateX(ref);
        const actualCardWidth = getActualCardWidth(ref);
        const targetTranslateX = Math.min(0, currentTranslateX + actualCardWidth * cardsInView);
        ref.current.style.transform = `translateX(${targetTranslateX}px)`;
        updateMaxMin();
        setShowPrev(false);
        setShowNext(false);
        setTimeout(() => {
            if (!ref.current)
                return;
            setShowNext(true);
            if (targetTranslateX !== 0) {
                setShowPrev(true);
            }
        }, 1000);
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "Slider", onMouseEnter: nextPreload, children: [children, showPrev && ((0, jsx_runtime_1.jsx)(ButtonPrev, { className: "SliderButton prev", onClick: prev, role: "button", "aria-label": "prev" })), (0, jsx_runtime_1.jsxs)("div", { ref: ref, className: "SliderRow", role: "list", children: [intro && ((0, jsx_runtime_1.jsx)("div", { role: "listitem", style: { display: "inline-block", verticalAlign: "top" }, children: intro })), (0, jsx_runtime_1.jsx)("div", { role: "none", style: {
                            display: "inline-block",
                            width: minI * getActualCardWidth(ref),
                        } }), items.slice(minI, maxI).map((props) => ((0, jsx_runtime_1.jsx)("div", { className: "listItem", role: "listitem", style: { display: "inline-block" }, children: (0, jsx_runtime_1.jsx)(Component, { ...props, ...other }) }, props.key))), intro && ((0, jsx_runtime_1.jsx)("div", { role: "listitem", style: { display: "inline-block", verticalAlign: "top" }, children: intro }))] }), showNext && ((0, jsx_runtime_1.jsx)(ButtonNext, { className: "SliderButton next", role: "button", "aria-label": "next", onClick: next, onMouseEnter: nextPreload }))] }));
}
exports.default = Slider;
//# sourceMappingURL=Slider.js.map