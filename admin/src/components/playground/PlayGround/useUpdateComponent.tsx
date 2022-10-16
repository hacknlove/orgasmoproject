import { useEffect } from "react";
import { useDynamicResource } from "@orgasmo/dynamicstate/react";

export default function useUpdateComponent(editItemConfig) {
  const storyComponentAreaResource = useDynamicResource(
    "var://area/storyComponent"
  );

  useEffect(() => {
    const json = JSON.parse(editItemConfig);

    storyComponentAreaResource.setValue({
      items: [
        {
          type: "StoryRender",
          props: {
            itemConfig: json,
          },
        },
      ],
    });
  }, [editItemConfig]);
}
