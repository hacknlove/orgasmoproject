import { useEffect } from "react";
import { useDynamicResource } from "@orgasmo/dynamicstate/react";

export default function useUpdateComponent(editPageConfig) {
  const storyComponentAreaResource = useDynamicResource(
    "var://area/pagePlaygroundRender_o"
  );

  useEffect(() => {
    const json = JSON.parse(editPageConfig);

    storyComponentAreaResource.setValue({
      items: [
        {
          type: "PagePlaygroundRender_o",
          props: {
            pageConfig: json,
            pathSample: json.exactPath,
          },
        },
      ],
    });
  }, [editPageConfig]);
}
