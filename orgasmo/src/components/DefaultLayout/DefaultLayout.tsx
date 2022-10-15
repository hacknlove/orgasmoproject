import Area from "../Area";
import { useDynamicValue } from "@orgasmo/dynamicstate/react";

export default function DefaultLayout({ cssVars }) {
  const [areas] = useDynamicValue("var://areasNames");

  if (!areas) {
    return null;
  }

  return (
    <div style={cssVars}>
      {areas.map((name) => (
        <div key={name} id={name} className="_oa">
          <Area name={name} />
        </div>
      ))}
    </div>
  );
}
