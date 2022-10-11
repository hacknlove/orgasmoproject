import AdminContext from "./AdminContext";
import { useContext, useCallback, useState } from "react";
import asyncit from "@orgasmo/orgasmo/AsyncComponents";
import Alert from "./Alert";
import Router from "next/router";

const ADMIN_UPDATE_PAGE_CONFIG_ENDPOINT = "/api/_oadmin/updatePageConfig";
const ADMIN_NEW_PAGE_CONFIG_ENDPOINT = "/api/_oadmin/newPageConfig";

function forceReload() {
  Router.replace(`/admin/_back?to=${encodeURIComponent(Router.asPath)}`);
}

function InputPageId({ resolve }) {
  const [pageId, setPageId] = useState<string>("");
  return (
    <div
      className="_oadmin_modal_wrapper"
      onClick={(event) => {
        event.stopPropagation();
        if (
          (event.target as HTMLDivElement).className === "_oadmin_modal_wrapper"
        ) {
          resolve();
        }
      }}
    >
      <div className="_oadmin_modal">
        <div id="_oadmin_menu_pageId">
          <span>Save as...</span>
          <button className="_oadmin_button" onClick={() => resolve()}>
            ✖
          </button>
        </div>
        <div className="_oadmin_modal_fields">
          <label>pageConfig</label>
          <input
            value={pageId}
            onChange={(event) => setPageId(event.target.value)}
          />
        </div>
        {pageId && (
          <div>
            <button className="_oadmin_button" onClick={() => resolve()}>
              Cancel
            </button>
            <button className="_oadmin_button" onClick={() => resolve(pageId)}>
              Save
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function Save() {
  const { isDirty, pageConfig, updatePageConfig, originalPageConfig } =
    useContext(AdminContext) as any;

  const save = useCallback(async () => {
    const response = await fetch(ADMIN_UPDATE_PAGE_CONFIG_ENDPOINT, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        pageConfig,
      }),
    })
      .then((r) => r.json())
      .catch((error) => ({ error }));

    if (typeof response.error === "string") {
      return asyncit(
        Alert,
        { title: "Error", text: response.error },
        "_oadminModal"
      );
    }
    if (response.error) {
      return asyncit(Alert, response.error, "_oadminModal");
    }

    if (response.ok) {
      forceReload();
    }
  }, [pageConfig]);

  const saveAs = useCallback(async () => {
    const pageId = await asyncit(InputPageId, {}, "_oadminModal");

    if (!pageId) {
      return;
    }

    const response = await fetch(ADMIN_NEW_PAGE_CONFIG_ENDPOINT, {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({
        pageConfig: {
          ...pageConfig,
          pageId,
        },
      }),
    })
      .then((r) => r.json())
      .catch((error) => ({ error }));

    if (typeof response.error === "string") {
      return asyncit(
        Alert,
        { title: "Error", text: response.error },
        "_oadminModal"
      );
    }
    if (response.error) {
      return asyncit(Alert, response.error, "_oadminModal");
    }

    asyncit(
      Alert,
      {
        title: "Saved",
        text: `The pageConfig has been save with the pageId ${pageId}`,
      },
      "_oadminModal"
    );
  }, [pageConfig]);

  if (!isDirty) {
    return null;
  }

  return (
    <div className="_oadmin_save_menu">
      <div>
        <button
          className="_oadmin_button"
          onClick={() => updatePageConfig(originalPageConfig)}
        >
          Reset
        </button>
        <button
          className="_oadmin_button"
          onClick={async () => {
            await navigator.clipboard.writeText(
              JSON.stringify(pageConfig, null, 2)
            );
            asyncit(Alert, { title: "Copied to clipboard" }, "_oadminModal");
          }}
        >
          Copy
        </button>
        <button className="_oadmin_button" onClick={save}>
          Save
        </button>
        <button className="_oadmin_button" onClick={saveAs}>
          Save as...
        </button>
      </div>
    </div>
  );
}
