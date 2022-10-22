import { useRef, useEffect } from "react";

export default function VerticalSize() {
  const ref = useRef() as any;

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const iframe = ref.current.previousElementSibling;

    function mouseDown() {
      window.addEventListener("mousemove", mouseMove);
      (
        document.getElementById("pageRender_iframe") as HTMLIFrameElement
      ).style.pointerEvents = "none";
    }
    function mouseUp() {
      console.log("mouse UP");
      window.removeEventListener("mousemove", mouseMove);
      (
        document.getElementById("pageRender_iframe") as HTMLIFrameElement
      ).style.pointerEvents = "";
    }
    function mouseMove(event) {
      iframe.style.height = `${event.clientY - 70}px`;
    }

    ref.current.addEventListener("mousedown", mouseDown);
    window.addEventListener("mouseup", mouseUp);

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
