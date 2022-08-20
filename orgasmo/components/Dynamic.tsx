import { memo, useCallback, useEffect, useState } from 'react'
import useScroll from './useScroll'
import useRows from './useRows'

export default memo(function Dynamic ({ getMore, rows: rowsProp, Components }: Record<string, any>) {
  const { rows, getRow, noMore } = useRows({ getMore, rows: rowsProp }) as { rows: Record<string, any>[], getRow: Function, noMore: boolean }

  useEffect(() => {
    getRow()
  }, [])

  const [overTheTopRows, setOverTheTopRows] = useState([] as number[])
  const [underTheBottomRows, setUnderTheBottomRows] = useState([] as number[])

  const onHideBotton = useCallback((element) => {
      setUnderTheBottomRows(current => [...current, element.getClientRects()[0].height])
  }, [setUnderTheBottomRows])
  
  const onHideTop = useCallback((element) => {
    setOverTheTopRows(current => [...current, element.getClientRects()[0].height])
  }, [setOverTheTopRows])
  
  const onShowTop = useCallback(() => {
    setOverTheTopRows(current => {
      if (current.length <= 1) return []
      return current.splice(0, current.length - 1)
    })
  }, [setOverTheTopRows])

  const unHideBottom = useCallback(() => {
    setUnderTheBottomRows(current => {
      if (current.length <= 1) return []
      return current.splice(0, current.length - 1)
    })
  }, [setUnderTheBottomRows])

  const ref = useScroll({
    threshold: 50,
    onHideBotton,
    onHideTop,
    onShowBotton: underTheBottomRows.length
      ? unHideBottom
      : noMore
      ? undefined
      : getRow,
    onShowTop: overTheTopRows.length ? onShowTop : undefined,
  })

  const restOfRows = rows.slice(overTheTopRows.length, rows.length - underTheBottomRows.length)

  return (
    <>
      <div style={{ height: overTheTopRows.reduce((r, i) => r + i, 0) }}/>
      <div ref={ref}>
        {
          restOfRows.map((props, i) => props && <Components key={i + overTheTopRows.length} type={props.type} props={props.props} /> )
        }
      </div>
      <div style={{ height: underTheBottomRows.reduce((r, i) => r + i, 0) }}/>
    </>
  )
}, (prev, next) => prev.getMore === next.getMore)