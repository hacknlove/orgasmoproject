const deleteNavItemConfig = {
  page: {
    delete({ item, fileDescriptor: { pageId } }) {
      for (const [path, pageIds] of Object.entries(item.props.pages)) {
        for (const testPageId of Object.keys(pageIds as Record<string, any>)) {
          if (testPageId === pageId) {
            delete item.props.pages[path][pageId];
            if (Object.keys(item.props.pages[path]).length === 0) {
              delete item.props.pages[path];
            }
            return;
          }
        }
      }
    },
    component: "PagesList_o",
  },

  component: {
    delete({ item, fileDescriptor: { story, component } }) {
      delete item.props.stories[component][story];
      if (Object.keys(item.props.stories[component]).length === 0) {
        delete item.props.stories[component];
      }
    },
    component: "Storieslist_o",
  },
};

export default function updateNavDelete({ dynamicState, fileDescriptor }) {
  const config = deleteNavItemConfig[fileDescriptor.type];

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

  config.delete({ item, fileDescriptor });

  dynamicState.setValue("var://area/MainLayout_nav_o", { ...MainLayout_nav });
}
