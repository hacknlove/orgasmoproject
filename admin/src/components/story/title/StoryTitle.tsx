import { useDynamicValue } from "@orgasmo/dynamicstate/react";

export default function StoryTitle({ component, story }) {
  const [isDirty] = useDynamicValue(`var://${component}/${story}/isDirty`);
  return (
    <h1 id="StoryTitle_h1">
      {component}: {story} {isDirty ? "*" : ""}
      <button id="StoryTitle_button" className="_oadmin_button"> Delete Story</button>
    </h1>
  );
}
