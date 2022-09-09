import { useEffect, useRef, useState } from "react";
import { SliderProps } from "../../types";
import useItems from "./useItems";

function getTranslateX(ref) {
  return (
    parseInt(
      (ref.current.style.transform.match(/translateX\((-?\d+\.?\d*)px\)/) ||
        [])[1]
    ) || 0
  );
}

export default function Slider({
  intro,
  introWidth = 0,
  Component,
  items: itemsProp,
  src: srcProps,
  cardWidth,
  ButtonNext,
  ButtonPrev,
  ...other
}: SliderProps): JSX.Element {
  const { items, hasMore, getMoreItems } = useItems({
    items: itemsProp,
    src: srcProps,
  });

  const ref = useRef<HTMLDivElement>();
  const [cardsInView, setCardsInView] = useState(4);
  const [minI, setMinI] = useState(0);
  const [maxI, setMaxI] = useState(9);

  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(true);

  useEffect(() => {
    function updateCardsInView() {
      if (!ref.current?.children?.[0]) return;

      const cardsInView = Math.max(
        1,
        Math.floor(ref.current.clientWidth / cardWidth)
      );
      setCardsInView(cardsInView);
    }

    updateCardsInView();

    window.addEventListener("resize", updateCardsInView);
    return () => window.removeEventListener("resize", updateCardsInView);
  }, [ref.current]);

  useEffect(() => updateMaxMin, [cardsInView]);

  useEffect(() => {
    if (!ref.current?.children?.[0]) {
      return () => undefined;
    }

    if (window.ontouchstart === undefined) {
      ref.current.style.transition = "transform 1s";
      return;
    }
    ref.current.style.transition = "none";

    let initialX: number | null = 0;
    let initialTranslateX = 0;
    let preventClick = false;

    function onMouseDown(event) {
      initialX = event.changedTouches[0].clientX;
      initialTranslateX = getTranslateX(ref);
      currY = event.changedTouches[0].clientY;
      currX = event.changedTouches[0].clientX;
    }
    function onMouseUp() {
      initialX = null;
      setTimeout(() => (preventClick = false), 100);
      updateMaxMin();

      if (items.length < maxI + 10) {
        getMoreItems(20);
      }

      function inertia(speed) {
        if (Math.abs(speed) < 0.1) {
          return;
        }
        const translateX = Math.min(0, getTranslateX(ref) + speed);
        if (ref.current) {
          ref.current.style.transform = `translateX(${translateX}px)`;
        }
        updateMaxMin();
        setTimeout(() => inertia(speed * 0.9), 10);
      }
      inertia(currX - prevX);
      document.body.style.overflowY = "scroll";
      mode = null;
    }

    let prevX;
    let currX;
    let prevY;
    let currY;
    let mode;

    function onMouseMove(event) {
      if (mode === "scroll") {
        return;
      }

      if (initialX === null) {
        return;
      }

      prevX = currX;
      currX = event.changedTouches[0].clientX;

      if (!mode) {
        prevY = currY;
        currY = event.changedTouches[0].clientY;
        if (Math.abs(currX - prevX) < Math.abs(currY - prevY)) {
          mode = "scroll";
          prevX = 0;
          currX = 0;
        } else {
          document.body.style.overflowY = "hidden";
          mode = "swipe";
        }
        return;
      }

      const delta = event.changedTouches[0].clientX - initialX;

      if (Math.abs(delta) > 10) {
        preventClick = true;
      }

      const translateX = Math.min(0, initialTranslateX + delta);
      if (ref.current) {
        ref.current.style.transform = `translateX(${translateX}px)`;
      }
      event.isSwiping = true;
    }

    function onclick(event) {
      if (preventClick) {
        event.preventDefault();
        event.stopPropagation();
      }
    }

    ref.current.addEventListener("click", onclick);
    ref.current.addEventListener("touchstart", onMouseDown);
    ref.current.addEventListener("touchend", onMouseUp);
    ref.current.addEventListener("touchcancel", onMouseUp);
    ref.current.addEventListener("touchmove", onMouseMove);

    return () => {
      if (!ref.current) {
        return;
      }
      ref.current.removeEventListener("touchstart", onMouseDown);
      ref.current.removeEventListener("touchend", onMouseUp);
      ref.current.removeEventListener("touchcancel", onMouseUp);
      ref.current.removeEventListener("touchmove", onMouseMove);
      ref.current.removeEventListener("click", onclick);
    };
  }, [ref.current, items, maxI, minI, cardsInView]);

  function updateMaxMin() {
    if (!ref.current) return;
    const targetTranslateX = getTranslateX(ref) + introWidth;

    const cardsMoved = Math.floor(Math.abs(targetTranslateX) / cardWidth);

    const minI = Math.max(0, cardsMoved - cardsInView);

    const maxI = Math.min(items.length, cardsMoved + cardsInView * 2 + 1);

    setMinI(minI);
    setMaxI(maxI);
  }

  async function next() {
    if (!ref.current) {
      return;
    }
    const currentTranslateX = getTranslateX(ref) + introWidth;

    const max =
      -cardWidth * (items.length - cardsInView) +
      (ref.current.clientWidth % cardWidth) -
      introWidth * 2;

    const targetTranslateX = Math.max(
      currentTranslateX - cardWidth * cardsInView - introWidth * 2,
      max
    );

    ref.current.style.transform = `translateX(${
      targetTranslateX + introWidth
    }px)`;
    updateMaxMin();
    setShowNext(false);
    setShowPrev(false);

    if (hasMore && items.length < maxI + cardsInView + 1) {
      await getMoreItems(cardsInView);
    }

    await new Promise((resolve) => setTimeout(resolve, 1000));

    if (targetTranslateX !== max || hasMore) {
      setShowNext(true);
    }
    setShowPrev(true);
  }

  function prev() {
    if (!ref.current) {
      return;
    }
    const currentTranslateX = getTranslateX(ref);

    const targetTranslateX = Math.min(
      0,
      currentTranslateX + cardWidth * cardsInView
    );

    ref.current.style.transform = `translateX(${targetTranslateX}px)`;

    updateMaxMin();

    setShowPrev(false);
    setShowNext(false);
    setTimeout(() => {
      if (!ref.current) return;
      setShowNext(true);
      if (targetTranslateX !== 0) {
        setShowPrev(true);
      }
      updateMaxMin();
    }, 1000);
  }

  return (
    <div className="Slider">
      {showPrev && (
        <ButtonPrev
          className="SliderButton prev"
          onClick={prev}
          role="button"
          aria-label="prev"
        />
      )}
      <div
        ref={ref as React.LegacyRef<HTMLDivElement> | undefined}
        className="SliderRow"
        role="list"
      >
        {intro && (
          <div
            role="listitem"
            style={{ display: "inline-block", verticalAlign: "top" }}
          >
            {intro}
          </div>
        )}
        <div
          role="none"
          style={{
            display: "inline-block",
            width: minI * cardWidth,
          }}
        ></div>
        {items.slice(minI, maxI).map((props) => (
          <div
            role="listitem"
            key={props.key}
            style={{ display: "inline-block" }}
          >
            <Component {...props} {...other} />
          </div>
        ))}
        {intro && (
          <div
            role="listitem"
            style={{ display: "inline-block", verticalAlign: "top" }}
          >
            {intro}
          </div>
        )}
      </div>
      {showNext && (
        <ButtonNext
          className="SliderButton next"
          role="button"
          aria-label="next"
          onClick={next}
        />
      )}
    </div>
  );
}
