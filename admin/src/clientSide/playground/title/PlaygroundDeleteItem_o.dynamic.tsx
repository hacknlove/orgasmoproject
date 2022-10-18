import asyncit from "@orgasmo/orgasmo/AsyncComponents";
import Alert from "../../modals/Alert";
import { useRouter } from "next/router";

export default function PlaygroundDeleteItem_o({ label, action }) {
  const router = useRouter();

  async function deleteStory() {
    const response = await fetch(action, {
      method: "DELETE",
      credentials: "include",
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

    router.push("/playground");
  }

  return (
    <button
      id="PlaygroundDeleteItem_o"
      className="button_o"
      onClick={deleteStory}
    >
      {label}
    </button>
  );
}
