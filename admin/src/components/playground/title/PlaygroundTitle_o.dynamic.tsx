import { useDynamicValue } from "@orgasmo/dynamicstate/react";
import asyncit from "@orgasmo/orgasmo/AsyncComponents";
import Alert from "../../modals/Alert.dynamic";
import { useRouter } from "next/router";

export default function playgroundTitle_o({ component, path, story, pageId }) {
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
    <div id="playgroundTitle_h1_o">
      <h2>
        {component ?? path}
      </h2>
      <h1>
        {story ?? pageId} {isDirty ? "*" : ""}
      </h1>
      <button
        id="playgroundTitle_button_o"
        className="_oadmin_button"
        onClick={deleteStory}
      >
        { component ? 'Delete Story' : 'Delete pageConfig' }
      </button>
    </div>
  );
}
