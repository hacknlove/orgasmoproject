export default function Static ({ rows, Components }) {
  return rows && rows.map((props, i) => props && <Components key={i} type={props.type} props={props.props} /> )
}