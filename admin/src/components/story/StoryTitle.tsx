import { useDynamicValue } from "@orgasmo/state/react";

export default function StoryTitle({ component, story }) {
  const [isDirty] = useDynamicValue(`var://${component}/${story}/isDirty`);
  return (
    <h1>
      {component}: {story} {isDirty ? "*" : ""}
    </h1>
  );
}
