import { useRef, useEffect } from "react";

export default function VerticalSize() {
  const ref = useRef() as any;

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    function mouseDown() {
      if (!document.getElementById("pageRender_iframe")) {
        return;
      }
      window.addEventListener("mousemove", mouseMove);
      window.addEventListener("mouseup", mouseUp);
      (
        document.getElementById("pageRender_iframe") as HTMLIFrameElement
      ).style.pointerEvents = "none";
    }
    function mouseUp() {
      window.removeEventListener("mousemove", mouseMove);
      (
        document.getElementById("pageRender_iframe") as HTMLIFrameElement
      ).style.pointerEvents = "";
    }
    function mouseMove(event) {
      const iframe = ref.current.previousElementSibling;

      iframe.style.height = `${event.clientY - 85}px`;
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

  return <div ref={ref} id="verticalSize" />;
}
