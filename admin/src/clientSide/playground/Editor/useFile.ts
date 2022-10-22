import { useDynamicState } from "@orgasmo/dynamicstate/react";
import { useEffect } from "react";

export default function useFile() {
  const sharedState = useDynamicState() as any;

  useEffect(
    () =>
      sharedState.onChange("var://activeFilepath_o", async (filePath) => {
        if (!filePath) {
          return;
        }
        let originalContent = sharedState.getValue(
          `var://file/${filePath}?original`
        );
        if (!originalContent) {
          originalContent = await fetch(`/api/_oadmin/playGround/getFile`, {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
              filePath,
            }),
          })
            .then((r) => r.json())
            .catch((error) => ({ error }))
            .then((json) => JSON.stringify(json, null, 4));

          sharedState.setValue(
            `var://file/${filePath}?original`,
            originalContent
          );
        }

        let fileContent = sharedState.getValue(
          `var://file/${filePath}?content`
        );
        if (!fileContent) {
          fileContent = originalContent;
          sharedState.setValue(
            `var://file/${filePath}?content`,
            originalContent
          );
        }
      }),
    []
  );
}
