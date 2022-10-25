"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("@orgasmo/dynamicstate/react");
const react_2 = require("react");
const addNavItemFunctions = {
    page({ dynamicState, fileContentJson: { pageId, exactPath, patternPath, description }, }) {
        var _a;
        const MainLayout_nav = dynamicState.getValue("var://area/MainLayout_nav_o");
        if (!MainLayout_nav) {
            return;
        }
        const pagesIndex = MainLayout_nav.findIndex((itemConfig) => itemConfig.type === "PageList_o");
        if (pagesIndex === -1) {
            return;
        }
        const item = MainLayout_nav[pagesIndex];
        const path = exactPath ?? patternPath;
        item[path] ?? (item[path] = {});
        (_a = item[path])[pageId] ?? (_a[pageId] = description ?? "");
        dynamicState
            .getResource("var://area/MainLayout_nav_o")
            .triggerSubscriptions();
    },
    component({ dynamicState, fileContentJson: { story, description, itemConfig: { component }, }, }) {
        var _a;
        const MainLayout_nav = dynamicState.getValue("var://area/MainLayout_nav_o");
        if (!MainLayout_nav) {
            return;
        }
        const storiesIndex = MainLayout_nav.findIndex((itemConfig) => itemConfig.type === "Storieslist_o");
        if (storiesIndex === -1) {
            return;
        }
        const item = MainLayout_nav[storiesIndex];
        item[component] ?? (item[component] = {});
        (_a = item[component])[story] ?? (_a[story] = description ?? "");
        dynamicState
            .getResource("var://area/MainLayout_nav_o")
            .triggerSubscriptions();
    },
};
function useNewFiles() {
    const dynamicState = (0, react_1.useDynamicState)();
    const onChange = (0, react_2.useCallback)((activeFilePath) => {
        debugger;
        const type = activeFilePath.match(/^\/(?<type>component|page\/)/);
        if (!type) {
            return;
        }
        const addNavItemFunction = addNavItemFunctions[type.groups?.type];
        const file = dynamicState.getValue(`var://file${activeFilePath}?original`) ?? "{}";
        try {
            const fileContentJson = JSON.parse(file);
            addNavItemFunction({
                dynamicState,
                fileContentJson,
            });
        }
        catch (error) {
            console.error(error);
        }
    }, [dynamicState]);
    (0, react_1.useDynamicChange)("var://activeFilepath_o", onChange);
}
exports.default = useNewFiles;
//# sourceMappingURL=useNewFiles.js.map