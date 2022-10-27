"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("@orgasmo/dynamicstate/react");
const EpCloseBold_1 = require("../../icons/EpCloseBold");
const CarbonReset_1 = require("../../icons/CarbonReset");
const CodiconSave_1 = require("../../icons/CodiconSave");
const IconoirEmptyPage_1 = require("../../icons/IconoirEmptyPage");
const RadixIconsBookmark_1 = require("../../icons/RadixIconsBookmark");
const MaterialSymbolsSettingsRounded_1 = require("../../icons/MaterialSymbolsSettingsRounded");
const AsyncComponents_1 = require("@orgasmo/orgasmo/AsyncComponents");
const Alert_1 = require("../../modals/Alert");
const updateNav_1 = require("./updateNav");
const MaterialSymbolsAdd_1 = require("../../icons/MaterialSymbolsAdd");
const getFileDescriptorFromFileContent_1 = require("./getFileDescriptorFromFileContent");
function TabButtons({ filePath }) {
    const dynamicState = (0, react_1.useDynamicState)();
    const [fileContent, setFileContent] = (0, react_1.useDynamicValue)(`var://file${filePath}?content`);
    const [originalContent, setOriginalContent] = (0, react_1.useDynamicValue)(`var://file${filePath}?original`);
    const isFileDirty = fileContent !== originalContent && originalContent !== ' "reset" ';
    const tabsResource = (0, react_1.useDynamicResource)("var://tabs_o");
    const activeFilepathResource = (0, react_1.useDynamicResource)("var://activeFilepath_o");
    function closeFilePath() {
        tabsResource.setValue(tabsResource.value.filter((path) => path !== filePath));
        if (activeFilepathResource.value === filePath) {
            activeFilepathResource.setValue(tabsResource.value[0]);
        }
    }
    function reset() {
        setFileContent(originalContent);
        setOriginalContent(' "reset" ');
        activeFilepathResource.triggerSubscriptions();
    }
    async function save() {
        const preFileDescriptor = (0, getFileDescriptorFromFileContent_1.default)(JSON.parse(fileContent));
        if (preFileDescriptor.filePath !== filePath) {
            const confirm = await (0, AsyncComponents_1.default)(Alert_1.default, {
                title: "Save as...",
                text: `the new filePath is ${preFileDescriptor.filePath}`,
                cancel: true,
            }, "playgroundModal_o");
            if (!confirm) {
                return;
            }
        }
        const fileDescriptor = await fetch("/api/_oadmin/playGround/saveFile", {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: fileContent,
        })
            .then((r) => r.json())
            .catch((error) => ({ error }));
        if (fileDescriptor.error) {
            return (0, AsyncComponents_1.default)(Alert_1.default, fileDescriptor.error, "playgroundModal_o");
        }
        if (activeFilepathResource.value === fileDescriptor.filePath) {
            setOriginalContent(fileContent);
        }
        else {
            dynamicState.setValue(`var://file${fileDescriptor.filePath}?original`, fileContent);
            activeFilepathResource.setValue(fileDescriptor.filePath);
            (0, updateNav_1.default)({ dynamicState, fileDescriptor });
        }
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "TabButtons_o", onClick: (event) => event.stopPropagation(), children: [isFileDirty && !filePath.startsWith("/new/") && ((0, jsx_runtime_1.jsx)(CarbonReset_1.default, { onClick: reset })), isFileDirty && (0, jsx_runtime_1.jsx)(CodiconSave_1.default, { onClick: save }), (0, jsx_runtime_1.jsx)(EpCloseBold_1.default, { onClick: closeFilePath })] }));
}
const Icons = {
    page: IconoirEmptyPage_1.default,
    component: RadixIconsBookmark_1.default,
    site: MaterialSymbolsSettingsRounded_1.default,
    new: MaterialSymbolsAdd_1.default,
};
function Tab({ filePath }) {
    const [activeFilepath, setActiveFilePath] = (0, react_1.useDynamicValue)("var://activeFilepath_o");
    const parsed = filePath.match(/^\/(?<type>[^/]+).*?(?<label>[^/]+)$/).groups;
    const Icon = Icons[parsed.type];
    return ((0, jsx_runtime_1.jsxs)("button", { className: `tab_o ${activeFilepath === filePath ? "active_o" : ""}`, onClick: () => setActiveFilePath(filePath), children: [(0, jsx_runtime_1.jsx)(Icon, {}), parsed.label, (0, jsx_runtime_1.jsx)(TabButtons, { filePath: filePath })] }));
}
exports.default = Tab;
//# sourceMappingURL=Tab.js.map