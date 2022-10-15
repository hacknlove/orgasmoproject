import { useDynamicValue } from "@orgasmo/dynamicstate/react";
import asyncit from "@orgasmo/orgasmo/AsyncComponents";
import Alert from "../../modals/Alert";
import { useRouter } from "next/router";

export default function StoryTitle({ component, story }) {
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
        "_oadminModal"
      );
    }

    if (response.error) {
      console.error(response.error);
      return asyncit(Alert, response.error, "_oadminModal");
    }

    router.push("/story");
  }

  return (
    <h1 id="StoryTitle_h1">
      {component}: {story} {isDirty ? "*" : ""}
      <button
        id="StoryTitle_button"
        className="_oadmin_button"
        onClick={deleteStory}
      >
        {" "}
        Delete Story
      </button>
    </h1>
  );
}
