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

function getActualCardWidth(ref) {
  if (!ref.current) {
    return 1;
  }
  return ref.current.querySelector(".listItem").getBoundingClientRect().width;
}
function getCardsInView(ref) {
  if (!ref.current) {
    return 1;
  }
  const actualCardWidth = getActualCardWidth(ref);
  return Math.max(
    1,
    Math.floor(0.1 + ref.current.clientWidth / actualCardWidth)
  );
}

export default function Slider({
  intro,
  introWidth = 0,
  Component,
  items: itemsProp,
  src: srcProps,
  ButtonNext,
  ButtonPrev,
  children,
  ...other
}: SliderProps): JSX.Element {
  const { items, hasMore, getMoreItems } = useItems({
    items: itemsProp,
    src: srcProps,
  });

  const ref = useRef<HTMLDivElement>();
  const [minI, setMinI] = useState(0);
  const [maxI, setMaxI] = useState(9);

  const [showPrev, setShowPrev] = useState(false);
  const [showNext, setShowNext] = useState(true);

  useEffect(() => {
    function updateCardsInView() {
      if (!ref.current) {
        return;
      }
      const newMaxi = updateMaxMin();

      if (newMaxi > maxI) {
        getMoreItems(newMaxi - maxI);
      }
    }

    updateCardsInView();

    window.addEventListener("resize", updateCardsInView);
    return () => window.removeEventListener("resize", updateCardsInView);
  }, [ref.current]);

  useEffect(() => {
    if (!ref.current) {
      return () => undefined;
    }

    if (window.ontouchstart === undefined) {
      ref.current.style.transition = "transform .75s";
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
  }, [ref.current, items, maxI, minI]);

  function updateMaxMin() {
    if (!ref.current) return maxI;
    const cardsInView = getCardsInView(ref);
    const targetTranslateX = getTranslateX(ref) + introWidth;

    const actualCardWidth = getActualCardWidth(ref);

    const cardsMoved = Math.floor(Math.abs(targetTranslateX) / actualCardWidth);

    const minI = Math.max(0, cardsMoved - cardsInView);

    const newMaxi = Math.min(items.length, cardsMoved + cardsInView * 2 + 1);

    setMinI(minI);
    setMaxI(newMaxi);
    return newMaxi;
  }

  async function next() {
    if (!ref.current) {
      return;
    }
    const currentTranslateX = getTranslateX(ref) + introWidth;

    const actualCardWidth = getActualCardWidth(ref);

    const cardsInView = getCardsInView(ref);

    const max =
      -actualCardWidth *
        (items.length - Math.floor(ref.current.clientWidth / actualCardWidth)) +
      (ref.current.clientWidth % actualCardWidth) -
      introWidth * 2;

    const targetTranslateX = Math.max(
      currentTranslateX - actualCardWidth * cardsInView - introWidth * 2,
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
    const cardsInView = getCardsInView(ref);
    const currentTranslateX = getTranslateX(ref);
    const actualCardWidth = getActualCardWidth(ref);

    const targetTranslateX = Math.min(
      0,
      currentTranslateX + actualCardWidth * cardsInView
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
      {children}
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
            width: minI * getActualCardWidth(ref),
          }}
        ></div>
        {items.slice(minI, maxI).map((props) => (
          <div
            className="listItem"
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
