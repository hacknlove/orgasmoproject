import { DynamicProps } from "~/types";
import DComponent from "../DComponent";
import useItems from "./useItems";

export default function Dynamic({
  src,
  items: itemsProp,
  mode,
  threshold,
  Components,
}: DynamicProps) {
  const { items, ref, overTheTop, keyOffset, underTheBottom } = useItems({
    src,
    mode,
    threshold,
    items: itemsProp ?? [],
  });

  return (
    <>
      <div style={{ height: overTheTop }} />
      <div ref={ref}>
        {items.map(
          (props: any, i) =>
            props && (
              <DComponent
                Components={Components}
                key={i + keyOffset}
                type={props.type}
                props={props.props}
              />
            )
        )}
      </div>
      <div style={{ height: underTheBottom }} />
    </>
  );
}
