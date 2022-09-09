import { DynamicProps } from "~/types";
import useItems from "./useItems";

export default function Dynamic({
  src,
  items: itemsProp,
  Components,
}: DynamicProps) {
  const { items, ref, overTheTop, keyOffset, underTheBottom } = useItems({
    src,
    items: itemsProp ?? [],
  });

  return (
    <>
      <div style={{ height: overTheTop }} />
      <div ref={ref}>
        {items.map(
          (props: any, i) =>
            props && (
              <Components
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
