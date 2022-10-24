"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const jsoneditor_1 = require("../../../../../ext/jsoneditor");
function JSONEditorWrapper(props) {
    const refContainer = (0, react_1.useRef)(null);
    const refEditor = (0, react_1.useRef)(null);
    (0, react_1.useEffect)(() => {
        if (!refContainer.current) {
            return;
        }
        if (refEditor.current) {
            return;
        }
        refEditor.current = new jsoneditor_1.JSONEditor({
            target: refContainer.current,
            props,
        });
        return () => {
            if (refEditor.current) {
                refEditor.current.destroy();
                refEditor.current = null;
            }
        };
    }, [refEditor.current, refContainer.current]);
    (0, react_1.useEffect)(() => {
        if (refEditor.current) {
            refEditor.current.updateProps(props);
        }
    }, [props]);
    return (0, jsx_runtime_1.jsx)("div", { className: "svelte-jsoneditor-react", ref: refContainer });
}
exports.default = JSONEditorWrapper;
//# sourceMappingURL=JsonEditor.js.map