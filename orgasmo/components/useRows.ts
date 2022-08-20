import { useCallback, useRef, useState } from "react"

const fetchMap = new Map()

async function cachedFetch(url) {
  console.debug(url)
  if (fetchMap.has(url)) {
    return fetchMap.get(url)
  }

  const response = fetch(url).then(res => res.json()).catch((e) =>
    {
      console.error(e)
      return false
    }
  )
  fetchMap.set(url, response)
  return response
} 

export default function useRows({ getMore, rows: rowsProp = [] }: { getMore: String, rows?: Record<string, any>[] }) {
  const [rows, setRows] = useState(rowsProp)

  const [noMore, setNoMore] = useState(false)
  const wait = useRef(Promise.resolve(undefined))

  const getRow = useCallback(async () => {
    if (noMore) return
    
    let resolveWait
    const myWait = wait.current
    wait.current = new Promise(res => resolveWait = res)
    await myWait



    const rows: any[] = await new Promise(resolveRows => {
      setRows(current => {
        resolveRows(current)
        return current
      })
    })
    
    const row = getMore && await cachedFetch(`/api/_ogr?c=${getMore}&n=${rows.length}`)

    console.log(row)

    if (!row) {
      setNoMore(true)
      resolveWait()
      return
    }


    setRows(current => [...current, row])

    resolveWait()
  }, [noMore, setRows, setNoMore, getMore, wait])

  return { rows, getRow, noMore }
}