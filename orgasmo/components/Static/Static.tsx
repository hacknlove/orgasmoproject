import { StaticProps } from "../../types";

export default function Static ({ rows, Components }: StaticProps): JSX.Element {
  return <>{
    rows && rows.map((props, i) => props && <Components key={i} type={props.type} props={props.props} /> )
  }</>
}