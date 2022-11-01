import Dynamic from "./Dynamic/Dynamic";
import Static from "./Static/Static";
import { useDynamicValue } from "@orgasmo/dynamicstate/react";

export function RenderArea({ area, Components }) {
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
}

export default function Area({ name }) {
  const [area] = useDynamicValue(`var://area/${name}`);
  const [{ Components }] = useDynamicValue(`var://Components`);

  return <RenderArea area={area} Components={Components} />;
}
