import { Components, waitForIt } from "./parseDirectory.";

export default async function getComponentStory({ component, story }) {
  await waitForIt;

  return Components[component]?.[story];
}
