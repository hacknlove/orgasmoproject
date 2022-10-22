import { useEffect } from "react";
import { useDynamicResource } from "@orgasmo/dynamicstate/react";

export default function useUpdateComponent(editPageConfig) {
  const storyComponentAreaResource = useDynamicResource(
    "var://area/PlaygroundRender_o"
  );

  useEffect(() => {
    const json = JSON.parse(editPageConfig);

    storyComponentAreaResource.setValue({
      items: [
        {
          type: "PlaygroundRender_o",
          props: {
            pageConfig: json,
            pathSample: json.exactPath,
          },
        },
      ],
    });
  }, [editPageConfig]);
}
