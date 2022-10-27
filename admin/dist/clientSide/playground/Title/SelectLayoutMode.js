"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@orgasmo/dynamicstate/react");
const PhColumns_1 = require("../../icons/PhColumns");
const PhRows_1 = require("../../icons/PhRows");
const Icons = {
    columns: PhRows_1.default,
    rows: PhColumns_1.default
};
const layouts = ['rows', 'columns'];
let i = 0;
const toggleConfig = {
    rows: {
        set: 'height',
        clean: 'width'
    },
    columns: {
        set: 'width',
        clean: 'height'
    }
};
let savedValue;
function SelectLayoutMode() {
    const [layoutMode, setLayoutMode] = (0, react_1.useDynamicValue)('var://layoutMode', { defaultValue: 'rows' });
    const Icon = Icons[layoutMode] ?? (() => null);
    function toggleLayoutMode() {
        i = (i + 1) & 1;
        const newLayoutMode = layouts[i];
        setLayoutMode(newLayoutMode);
        const PlaygroundRender_o = document.getElementById('PlaygroundRender_o');
        const config = toggleConfig[newLayoutMode];
        console.log({ PlaygroundRender_o });
        if (!PlaygroundRender_o) {
            return;
        }
        if (!savedValue) {
            PlaygroundRender_o.style.flexGrow = '1';
        }
        else {
            PlaygroundRender_o.style.flexGrow = '0';
            PlaygroundRender_o.style[config.set] = savedValue;
        }
        savedValue = PlaygroundRender_o.style[config.clean];
        PlaygroundRender_o.style[config.clean] = '';
        console.log({ savedValue });
    }
    return (0, jsx_runtime_1.jsx)(Icon, { className: "icon_o", onClick: toggleLayoutMode });
}
exports.default = SelectLayoutMode;
//# sourceMappingURL=SelectLayoutMode.js.map