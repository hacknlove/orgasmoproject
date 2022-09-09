import { StaticProps } from "../../types";

export default function Static({
  items,
  Components,
}: StaticProps): JSX.Element {
  return (
    <>
      {items &&
        items.map(
          (props, i) =>
            props && (
              <Components key={i} type={props.type} props={props.props} />
            )
        )}
    </>
  );
}
