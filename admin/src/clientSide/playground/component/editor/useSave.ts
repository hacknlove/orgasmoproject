import { useRouter } from "next/router";
import { useCallback } from "react";
import asyncit from "@orgasmo/orgasmo/AsyncComponents";
import SaveAsInput from "../../../modals/SaveAsInput.dynamic";
import Alert from "../../../modals/Alert.dynamic";

const ADMIN_UPSERT_STORY_CONFIG_ENDPOINT = "/api/_oadmin/story";

export default function useSave({ files, description, itemConfig }) {
  const router = useRouter();

  return useCallback(
    async (file) => {
      if (!file.edit.isDirty) {
        return;
      }

      const storyName = await asyncit(
        SaveAsInput,
        {
          title: `Save ${file.label}`,
          label: "Story",
          defaultValue: router.query.story,
        },
        "playgroundModal_o"
      );

      if (!storyName) {
        return;
      }

      const response = await fetch(ADMIN_UPSERT_STORY_CONFIG_ENDPOINT, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          storyConfig: {
            component: router.query.component,
            story: storyName,
            description,
            itemConfig,
            [file.field]: file.edit.prepareToSend(),
          },
        }),
      })
        .then((r) => r.json())
        .catch((error) => ({ error }));

      if (typeof response.error === "string") {
        return asyncit(
          Alert,
          { title: "Error", text: response.error },
          "playgroundModal_o"
        );
      }
      if (response.error) {
        return asyncit(Alert, response.error, "playgroundModal_o");
      }

      router.push({
        pathname: router.pathname,
        query: {
          ...router.query,
          story: storyName,
        },
      });
    },
    [files.current, router.query.component, router.query.story]
  );
}
