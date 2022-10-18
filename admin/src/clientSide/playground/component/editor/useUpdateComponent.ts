import { useEffect } from "react";
import { useDynamicResource } from "@orgasmo/dynamicstate/react";

export default function useUpdateComponent(editItemConfig) {
  const storyComponentAreaResource = useDynamicResource(
    "var://area/PlaygroundRender_o"
  );

  useEffect(() => {
    const json = JSON.parse(editItemConfig);

    storyComponentAreaResource.setValue({
      items: [
        {
          type: "PlaygroundRenderComponent_o",
          props: {
            itemConfig: json,
          },
        },
      ],
    });
  }, [editItemConfig]);
}
