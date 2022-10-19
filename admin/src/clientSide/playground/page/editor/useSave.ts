import { useRouter } from "next/router";
import { useCallback } from "react";
import asyncit from "@orgasmo/orgasmo/AsyncComponents";
import Alert from "../../../modals/Alert";

const ADMIN_UPSERT_PAGE_CONFIG_ENDPOINT = "/api/_oadmin/page";

export default function useSave({ files, editPageConfig }) {
  const router = useRouter();

  return useCallback(
    async (file) => {
      if (!file.edit.isDirty) {
        return;
      }

      const pageConfig = editPageConfig.prepareToSend();

      const response = await fetch(ADMIN_UPSERT_PAGE_CONFIG_ENDPOINT, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ pageConfig }),
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
          pageId: pageConfig.pageId,
        },
      });
    },
    [files.current, router.query.component, router.query.story, editPageConfig]
  );
}
