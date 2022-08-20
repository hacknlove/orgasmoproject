import { useEffect, useRef } from "react"

export default function useScroll ({
  onHideBotton,
  onHideTop,
  onShowBotton,
  onShowTop,
  threshold
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const scroll = useRef(null  as null | number)

  useEffect(() => {
    if (!ref.current) return

    function handler () {
      if (!ref.current) return

      const currentScroll = window.scrollY

      const scrollDiff = currentScroll - (scroll.current as number)
      scroll.current = currentScroll

      if (isNaN(scrollDiff)) {
        return
      }

      const windowHeight = window.innerHeight
      const containerRect = ref.current.getBoundingClientRect()
      if (containerRect.y > windowHeight) {
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
          window.requestAnimationFrame(() => onHideTop(firstElement))
        }
        if (onShowBotton && lastElementClientRect.y - threshold < windowHeight) {
          window.requestAnimationFrame(onShowBotton)
        }
      }

      if (scrollDiff < 0) {
        if (onShowTop && firstElementClientRect.y + threshold > 0 && firstElementClientRect.y - threshold < windowHeight) {
          window.requestAnimationFrame(onShowTop)
        }
        if (onHideBotton && lastElementClientRect.y - lastElementClientRect.height - threshold > windowHeight && firstElementClientRect.y + firstElementClientRect.height + threshold < windowHeight) {
          window.requestAnimationFrame(() => onHideBotton(lastElement))
        }
      }

    }
    window.addEventListener("scroll", handler, { passive: true })
    
    return () => {
      window.removeEventListener("scroll", handler)
    }
  }, [onHideBotton, onHideTop, onShowBotton, onShowTop, ref])
  return ref
}
