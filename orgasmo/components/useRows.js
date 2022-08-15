import { useCallback, useRef, useState } from "react"

const fetchMap = new Map()

async function cachedFetch(url) {
  if (fetchMap.has(url)) {
    return fetchMap.get(url)
  }

  const response = fetch(url).then(res => res.json()).catch(() => false)
  fetchMap.set(url, response)
  return response
} 

export default function useRows({ getMore, rows: rowsProp = [] }) {
  const [rows, setRows] = useState(rowsProp)

  const [noMore, setNoMore] = useState(false)
  const wait = useRef(false)

  const getRow = useCallback(async () => {
    if (noMore) return
    
    let resolve
    const myWait = wait.current
    wait.current = new Promise(res => resolve = res)
    await myWait



    const rows = await new Promise(resolve => {
      setRows(current => {
        resolve(current)
        return current
      })
    })
    
    const row = await cachedFetch(`/api/_?c=${getMore}&n=${rows.length}`)

    if (!row) {
      setNoMore(true)
      resolve()
      return
    }


    setRows(current => [...current, row])

    resolve()
  }, [noMore, setRows, setNoMore, getMore, wait])

  return { rows, getRow, noMore }
}