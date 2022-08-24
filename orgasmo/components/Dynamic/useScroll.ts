import { useEffect, useRef } from "react"

export default function useScroll ({
  onHideBotton,
  onHideTop,
  onShowBotton,
  onShowTop,
  threshold,
  wait
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const scroll = useRef(null  as null | number)
  const height = useRef(null as null | number)

  useEffect(() => {
    if (!ref.current) return

    function handler () {
      if (!ref.current || wait.working) return

      const currentScroll = window.scrollY
      const currentHeight = window.innerHeight


      const scrollDiff = currentScroll - (scroll.current as number) || 
      currentHeight - (height.current as number)
      
      scroll.current = currentScroll
      height.current = currentHeight

      if (isNaN(scrollDiff)) {
        return
      }

      const containerRect = ref.current.getBoundingClientRect()
      if (containerRect.y > currentHeight) {
        return
      }
      if (containerRect.y + containerRect.height < 0) {
        return
      }

      const firstElement = ref.current.firstElementChild
      const lastElement = ref.current.lastElementChild

      if (!firstElement || !lastElement) return

      const firstElementClientRect = firstElement.getBoundingClientRect()
      const lastElementClientRect = lastElement.getBoundingClientRect()


      if (scrollDiff > 0) {
        if (onHideTop && firstElementClientRect.y + firstElementClientRect.height + threshold < 0) {
          wait.working = true
          window.requestAnimationFrame(() => onHideTop(firstElement))
        }
        if (onShowBotton && lastElementClientRect.y - threshold < currentHeight) {
          wait.working = true
          window.requestAnimationFrame(onShowBotton)
        }
      }

      if (scrollDiff < 0) {
        if (onShowTop && firstElementClientRect.y + threshold > 0 && firstElementClientRect.y - threshold < currentHeight) {
          wait.working = true
          window.requestAnimationFrame(onShowTop)
        }
        if (onHideBotton && lastElementClientRect.y - lastElementClientRect.height - threshold > currentHeight && firstElementClientRect.y + firstElementClientRect.height + threshold < currentHeight) {
          wait.working = true
          window.requestAnimationFrame(() => onHideBotton(lastElement))
        }
      }

    }
    window.addEventListener("scroll", handler, { passive: true })
    window.addEventListener("resize", handler, { passive: true })

    return () => {
      window.removeEventListener("scroll", handler)
      window.removeEventListener("resize", handler)
    }
  }, [onHideBotton, onHideTop, onShowBotton, onShowTop, ref])
  return ref
}
