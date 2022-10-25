const addNavItemConfig = {
  page: {
    add({ item, fileDescriptor: { pageId, path, description } }) {
      item.props.pages[path] ??= {};
      item.props.pages[path][pageId] ??= description ?? "";
    },
    component: "PagesList_o",
  },

  component: {
    add({ item, fileDescriptor: { story, description, component } }) {
      item.props.stories[component] ??= {};
      item.props.stories[component][story] ??= description ?? "";
    },
    component: "Storieslist_o",
  },
};

export default function updateNav({ dynamicState, fileDescriptor }) {
  const config = addNavItemConfig[fileDescriptor.type];

  if (!config) {
    return;
  }

  const MainLayout_nav = dynamicState.getValue("var://area/MainLayout_nav_o");
  if (!MainLayout_nav) {
    return;
  }

  const item = MainLayout_nav.items.find(
    (itemConfig) => itemConfig.type === config.component
  );

  if (!item) {
    return;
  }

  config.add({ item, fileDescriptor });

  dynamicState.setValue("var://area/MainLayout_nav_o", { ...MainLayout_nav });
}
