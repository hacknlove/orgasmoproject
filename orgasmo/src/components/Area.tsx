import { useContext, useMemo } from "react";
import AreasContext from "./AreasContext";
import Dynamic from "./Dynamic/Dynamic";
import Static from "./Static/Static";

export function RenderArea({ area, DComponent }) {
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
        DComponent={DComponent}
      />
    );
  }
  return <Static items={area.items} DComponent={DComponent} />;
}

export default function Area({ name }) {
  const { areas, DComponent } = useContext(AreasContext);

  return useMemo(() => <RenderArea area={areas[name]} DComponent={DComponent} />, [areas[name], DComponent]);
}
