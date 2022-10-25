"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const addNavItemConfig = {
    page: {
        add({ item, fileDescriptor: { pageId, path, description } }) {
            var _a, _b;
            (_a = item.props.pages)[path] ?? (_a[path] = {});
            (_b = item.props.pages[path])[pageId] ?? (_b[pageId] = description ?? "");
        },
        component: "PagesList_o",
    },
    component: {
        add({ item, fileDescriptor: { story, description, component } }) {
            var _a, _b;
            (_a = item.props.stories)[component] ?? (_a[component] = {});
            (_b = item.props.stories[component])[story] ?? (_b[story] = description ?? "");
        },
        component: "Storieslist_o",
    },
};
function updateNav({ dynamicState, fileDescriptor }) {
    const config = addNavItemConfig[fileDescriptor.type];
    if (!config) {
        return;
    }
    const MainLayout_nav = dynamicState.getValue("var://area/MainLayout_nav_o");
    if (!MainLayout_nav) {
        return;
    }
    const item = MainLayout_nav.items.find((itemConfig) => itemConfig.type === config.component);
    if (!item) {
        return;
    }
    config.add({ item, fileDescriptor });
    dynamicState.setValue("var://area/MainLayout_nav_o", { ...MainLayout_nav });
}
exports.default = updateNav;
//# sourceMappingURL=updateNav.js.map