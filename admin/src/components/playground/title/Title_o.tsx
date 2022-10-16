import { useDynamicValue } from "@orgasmo/dynamicstate/react";
import asyncit from "@orgasmo/orgasmo/AsyncComponents";
import Alert from "../../modals/Alert";
import { useRouter } from "next/router";

export default function playgroundTitle_o({ component, story }) {
  const [isDirty] = useDynamicValue(`var://${component}/${story}/isDirty`);
  const router = useRouter();

  async function deleteStory() {
    const response = await fetch(
      `/api/_oadmin/story?component=${component}&story=${story}`,
      {
        method: "DELETE",
        credentials: "include",
      }
    )
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

    router.push("/story");
  }

  return (
    <h1 id="playgroundTitle_h1_o">
      {component}: {story} {isDirty ? "*" : ""}
      <button
        id="playgroundTitle_button_o"
        className="_oadmin_button"
        onClick={deleteStory}
      >
        {" "}
        Delete Story
      </button>
    </h1>
  );
}