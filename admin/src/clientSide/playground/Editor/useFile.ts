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
        if (filePath.startsWith("/new/")) {
          return;
        }
        let originalContent = sharedState.getValue(
          `var://file${filePath}?original`
        );
        const force = originalContent === ' "reset" ';
        if (!originalContent || force) {
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
            `var://file${filePath}?original`,
            originalContent
          );
        }

        let fileContent = sharedState.getValue(`var://file${filePath}?content`);
        if (!fileContent || force) {
          fileContent = originalContent;
          sharedState.setValue(
            `var://file${filePath}?content`,
            originalContent
          );
        }
      }),
    []
  );
}
