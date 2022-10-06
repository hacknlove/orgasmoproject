import { StaticProps } from "../../types";

export default function Static({
  items,
  DComponent,
}: StaticProps): JSX.Element {
  return (
    <>
      {items &&
        items.map(
          (props, i) =>
            props && (
              <DComponent key={i} type={props.type} props={props.props} />
            )
        )}
    </>
  );
}
