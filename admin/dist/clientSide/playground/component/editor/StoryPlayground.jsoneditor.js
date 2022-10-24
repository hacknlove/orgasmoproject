"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const router_1 = require("next/router");
const react_1 = require("react");
const equal = require("fast-deep-equal");
const react_2 = require("@orgasmo/dynamicstate/react");
const dynamic_1 = require("next/dynamic");
const JSONEditor = (0, dynamic_1.default)(() => import("./JsonEditor.js"), { ssr: false });
function StoryPlayground({ description, itemConfig }) {
    const router = (0, router_1.useRouter)();
    const [editItemConfig, setEditItemConfig] = (0, react_1.useState)({
        json: itemConfig,
    });
    const storyComponentAreaResource = (0, react_2.useDynamicResource)("var://area/PlaygroundRender_o");
    const [reset, setReset] = (0, react_1.useState)({});
    const [editNotes, setEditNotes] = (0, react_1.useState)(description);
    const isDirty = (0, react_2.useDynamicResource)(`var://${router.query.component}/${router.query.story}/isDirty_o`);
    const isItemConfigDirty = (0, react_1.useMemo)(() => {
        let json = editItemConfig.json;
        if (editItemConfig.text) {
            try {
                json = JSON.parse(editItemConfig.text);
            }
            catch {
                return;
            }
        }
        return !equal(itemConfig, json);
    }, [editItemConfig, itemConfig]);
    const isNotesDirty = (0, react_1.useMemo)(() => editNotes !== description, [editNotes, description]);
    const jsoneditor = (0, react_1.useMemo)(() => (0, jsx_runtime_1.jsx)(JSONEditor, { content: editItemConfig, onChange: setEditItemConfig }), [router.query.component, router.query.story, reset]);
    (0, react_1.useEffect)(() => {
        let json = editItemConfig.json;
        if (editItemConfig.text) {
            try {
                json = JSON.parse(editItemConfig.text);
            }
            catch {
                return;
            }
        }
        storyComponentAreaResource.setValue({
            items: [
                {
                    type: "StoryPlaygroundRender_o",
                    props: {
                        itemConfig: json,
                    },
                },
            ],
        });
    }, [editItemConfig]);
    (0, react_1.useEffect)(() => {
        isDirty.setValue(isItemConfigDirty || isNotesDirty);
    }, [isItemConfigDirty, isNotesDirty]);
    (0, react_1.useEffect)(() => {
        setEditItemConfig({ json: itemConfig });
        setEditNotes(description);
    }, [description, itemConfig]);
    return ((0, jsx_runtime_1.jsxs)("div", { children: [jsoneditor, (0, jsx_runtime_1.jsx)("div", { id: "StoryPlayground_buttons", children: isItemConfigDirty && ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("button", { className: "button_o", onClick: () => {
                                setEditItemConfig({ json: itemConfig });
                                setReset({});
                            }, children: "Reset" }), (0, jsx_runtime_1.jsx)("button", { className: "button_o", children: "Save as" }), (0, jsx_runtime_1.jsx)("button", { className: "button_o", children: "Save" })] })) }), (0, jsx_runtime_1.jsxs)("div", { id: "StoryPlayground_description_o", children: [(0, jsx_runtime_1.jsx)("label", { children: "Notes" }), (0, jsx_runtime_1.jsx)("textarea", { className: "StoryPlayground_textarea_o", value: editNotes, onChange: (event) => setEditNotes(event.target.value) }), isNotesDirty && ((0, jsx_runtime_1.jsxs)("div", { className: "jsoneditor_buttons_o", children: [(0, jsx_runtime_1.jsx)("button", { className: "button_o", onClick: () => {
                                    setEditNotes(description);
                                }, children: "Reset" }), (0, jsx_runtime_1.jsx)("button", { className: "button_o", children: "Save as" }), (0, jsx_runtime_1.jsx)("button", { className: "button_o", children: "Save" })] }))] })] }));
}
exports.default = StoryPlayground;
//# sourceMappingURL=StoryPlayground.jsoneditor.js.map