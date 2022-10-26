import { Components, waitForIt } from "./parseDirectory";

export default async function getAllStories() {
  await waitForIt;

  return Object.fromEntries(
    Object.entries(Components).map(([key, component]) => [
      key,
      Object.fromEntries(
        Object.entries(component as Record<string, any>).map(
          ([story, storyConfig]) => [story, storyConfig.description]
        )
      ),
    ])
  );
}
