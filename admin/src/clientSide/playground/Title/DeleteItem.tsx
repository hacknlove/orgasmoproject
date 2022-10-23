import asyncit from "@orgasmo/orgasmo/AsyncComponents";
import Alert from "../../modals/Alert";

export default function DeleteItem({ filePath }) {
  async function deleteStory() {
    const response = await fetch(`/api/_oadmin/playGround/deleteFile`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ filePath }),
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
      console.error(response.error);
      return asyncit(Alert, response.error, "playgroundModal_o");
    }
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
