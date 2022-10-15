import Dynamic from "./Dynamic/Dynamic";
import Static from "./Static/Static";
import { useDynamicValue } from "@orgasmo/dynamicstate/react";

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
  const [area] = useDynamicValue(`var://area/${name}`);
  const [{ DComponent }] = useDynamicValue(`var://DComponent`);

  return <RenderArea area={area} DComponent={DComponent} />;
}
