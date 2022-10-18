import { useEffect } from "react";
import { useDynamicResource } from "@orgasmo/dynamicstate/react";

export default function useUpdateComponent(editPageConfig) {
  const storyComponentAreaResource = useDynamicResource(
    "var://area/pageRender_o"
  );

  useEffect(() => {
    const json = JSON.parse(editPageConfig);

    console.log({ json })

    storyComponentAreaResource.setValue({
      items: [
        {
          type: "PageRender_o",
          props: {
            pageConfig: json,
            samplePath: json.exactPath,
          },
        },
      ],
    });
  }, [editPageConfig]);
}
