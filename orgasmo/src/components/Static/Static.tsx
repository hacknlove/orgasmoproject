import { StaticProps } from "../../types";
import DComponent from "../DComponent";

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
              <DComponent
                key={i}
                type={props.type}
                props={props.props}
                Components={Components}
              />
            )
        )}
    </>
  );
}
