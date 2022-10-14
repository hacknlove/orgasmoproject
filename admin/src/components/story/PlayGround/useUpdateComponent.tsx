import AreasContext from "@orgasmo/orgasmo/AreasContext";
import { useEffect, useContext } from "react";

export default function useUpdateComponent(editItemConfig) {
  const { setAreas } = useContext(AreasContext);

  useEffect(() => {
    const json = JSON.parse(editItemConfig);

    setAreas((areas) => ({
      ...areas,
      storyComponent: {
        items: [
          {
            type: "StoryRender",
            props: {
              itemConfig: json,
            },
          },
        ],
      },
    }));
  }, [editItemConfig]);
}
