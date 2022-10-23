import { useRef, useEffect } from "react";

export default function HorizontalSize() {
  const ref = useRef() as any;

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const nav = ref.current.previousElementSibling;

    function mouseDown() {
      window.addEventListener("mousemove", mouseMove);
      window.addEventListener("mouseup", mouseUp);

      const iframe = document.getElementById("pageRender_iframe");
      if (iframe) {
        iframe.style.pointerEvents = "none";
      }
    }
    function mouseUp() {
      window.removeEventListener("mousemove", mouseMove);
      const iframe = document.getElementById("pageRender_iframe");
      if (iframe) {
        iframe.style.pointerEvents = "";
      }
    }
    function mouseMove(event) {
      nav.style.width = `${event.clientX - 2}px`;
    }

    ref.current.addEventListener("mousedown", mouseDown);

    return () => {
      window.removeEventListener("mouseout", mouseUp);
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", mouseUp);

      if (!ref.current) {
        return;
      }
      ref.current.removeEventListener("mousedown", mouseDown);
    };
  }, [ref.current]);

  return <div ref={ref} id="horizontalSize" />;
}
