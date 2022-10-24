import {
  useDynamicChange,
  useDynamicResource,
  useDynamicState,
} from "@orgasmo/dynamicstate/react";

const addNavItemFunctions = {
  page({
    dynamicState,
    fileContentJson: { pageId, exactPath, patternPath, description },
  }) {
    const MainLayout_nav = dynamicState.getValue("var://area/MainLayout_nav_o");

    const pagesIndex = MainLayout_nav.findIndex(
      (itemConfig) => itemConfig.type === "PageList_o"
    );

    if (pagesIndex === -1) {
      return;
    }

    const item = MainLayout_nav[pagesIndex];

    const path = exactPath ?? patternPath;

    item[path] ??= {};
    item[path][path] ??= description ?? "";

    dynamicState
      .getResource("var://area/MainLayout_nav_o")
      .triggerSubscriptions();
  },

  component({
    dynamicState,
    fileContentJson: {
      story,
      description,
      itemConfig: { component },
    },
  }) {
    const MainLayout_nav = dynamicState.getValue("var://area/MainLayout_nav_o");

    const storiesIndex = MainLayout_nav.findIndex(
      (itemConfig) => itemConfig.type === "Storieslist_o"
    );

    if (storiesIndex === -1) {
      return;
    }

    const item = MainLayout_nav[storiesIndex];

    item[component] ??= {};
    item[component][story] ??= description ?? "";

    dynamicState
      .getResource("var://area/MainLayout_nav_o")
      .triggerSubscriptions();
  },
};

export default function useNewFiles() {
  const dynamicState = useDynamicState();

  useDynamicChange("var://activeFilepath_o", (activeFilePath: string) => {
    const type = activeFilePath.match(/^\/(?<type>component|page\/)/);

    if (!type) {
      return;
    }

    const addNavItemFunction = addNavItemFunctions[type.groups?.type as string];

    const file =
      dynamicState.getValue(`var://file${activeFilePath}?original`) ?? "{}";
    try {
      const fileContentJson = JSON.parse(file);

      addNavItemFunction({
        dynamicState,
        fileContentJson,
      });
    } catch (error) {
      console.error(error);
    }
  });
}
