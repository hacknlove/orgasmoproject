import { useDynamicState } from "@orgasmo/dynamicstate/react";
import asyncit from "@orgasmo/orgasmo/AsyncComponents";
import Alert from "../../modals/Alert";
import updateNavDelete from "./updateNavDelete";

export default function DeleteItem({ filePath }) {
  const dynamicState = useDynamicState();

  async function deleteStory() {
    const fileDescriptor = await fetch(`/api/_oadmin/playGround/deleteFile`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ filePath }),
    })
      .then((r) => r.json())
      .catch((error) => ({ error }));

    if (typeof fileDescriptor.error === "string") {
      return asyncit(
        Alert,
        { title: "Error", text: fileDescriptor.error },
        "playgroundModal_o"
      );
    }

    if (fileDescriptor.error) {
      console.error(fileDescriptor.error);
      return asyncit(Alert, fileDescriptor.error, "playgroundModal_o");
    }

    updateNavDelete({ dynamicState, fileDescriptor });
    const tabs = dynamicState.getValue("var://tabs_o");
    dynamicState.setValue(
      "var://tabs_o",
      tabs.filter((path) => path !== filePath)
    );

    dynamicState.setValue(
      "var://activeFilepath_o",
      tabs[tabs.length - 2] ?? null
    );
    dynamicState.setValue(`var://file${filePath}?content`, "");
    dynamicState.setValue(`var://file${filePath}?original`, "");
  }

  if (!filePath) {
    return null;
  }

  if (filePath === "/site/config") {
    return null;
  }

  return (
    <button
      id="PlaygroundDeleteItem_o"
      className="button_o"
      onClick={deleteStory}
    >
      Delete
    </button>
  );
}
