import { useContext } from "react";
import Area from "../Area";
import AreasContext from "../AreasContext";

export default function DefaultLayout({ cssVars }) {
  const { areas } = useContext(AreasContext);

  return (
    <div style={cssVars}>
      {Object.keys(areas).map((name) => (
        <div key={name} id={name}>
          <Area name={name} />
        </div>
      ))}
    </div>
  );
}
