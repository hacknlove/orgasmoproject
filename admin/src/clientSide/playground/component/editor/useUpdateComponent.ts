import { useEffect } from "react";
import { useDynamicResource } from "@orgasmo/dynamicstate/react";

export default function useUpdateComponent(editItemConfig) {
  const storyComponentAreaResource = useDynamicResource(
    "var://area/storyComponent_o"
  );

  useEffect(() => {
    const json = JSON.parse(editItemConfig);

    storyComponentAreaResource.setValue({
      items: [
        {
          type: "StoryRender_o",
          props: {
            itemConfig: json,
          },
        },
      ],
    });
  }, [editItemConfig]);
}
