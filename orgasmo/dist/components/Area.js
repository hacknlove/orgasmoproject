"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RenderArea = void 0;
const jsx_runtime_1 = require("react/jsx-runtime");
const Dynamic_1 = require("./Dynamic/Dynamic");
const Static_1 = require("./Static/Static");
const react_1 = require("@orgasmo/dynamicstate/react");
function RenderArea({ area, DComponent }) {
    if (!area) {
        return null;
    }
    if (area.mode === "bubble" || area.mode === "grow") {
        return ((0, jsx_runtime_1.jsx)(Dynamic_1.default, { items: area.items, src: area.src, mode: area.mode, threshold: area.threshold, DComponent: DComponent }));
    }
    return (0, jsx_runtime_1.jsx)(Static_1.default, { items: area.items, DComponent: DComponent });
}
exports.RenderArea = RenderArea;
function Area({ name }) {
    const [area] = (0, react_1.useDynamicValue)(`var://area/${name}`);
    const [{ DComponent }] = (0, react_1.useDynamicValue)(`var://DComponent`);
    return (0, jsx_runtime_1.jsx)(RenderArea, { area: area, DComponent: DComponent });
}
exports.default = Area;
//# sourceMappingURL=Area.js.map