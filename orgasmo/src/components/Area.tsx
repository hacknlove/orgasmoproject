import { useContext, useMemo } from "react";
import AreasContext from "./AreasContext";
import Dynamic from "./Dynamic/Dynamic";
import Static from "./Static/Static";

export default function Area({ name }) {
  const { areas, Components } = useContext(AreasContext);

  return useMemo(() => {
    const area = areas[name];

    if (!area) {
      return null;
    }

    if (area.mode === "bubble" || area.mode === "grow") {
      return (
        <Dynamic
          items={area.items}
          src={area.src}
          mode={area.mode}
          threshold={area.threshold}
          Components={Components}
        />
      );
    }
    return <Static items={area.items} Components={Components} />;
  }, [areas[name]]);
}
