import useRows from './useRows'

export default function Dynamic ({ src, rows: rowsProp, Components }: Record<string, any>) {
  const {
    rows,
    ref,
    overTheTop,
    keyOffset,
    underTheBottom
  } = useRows({ src, rows: rowsProp })

  return (
    <>
      <div style={{ height: overTheTop }}/>
      <div ref={ref}>
        {
          rows.map((props: any, i) => props && <Components key={i + keyOffset} type={props.type} props={props.props} /> )
        }
      </div>
      <div style={{ height: underTheBottom }}/>
    </>
  )
}