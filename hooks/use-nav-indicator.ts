"use client";

import { useCallback, useEffect, useState } from "react";

const TRANSITION_MS = 280;
const EASING = "cubic-bezier(0.25, 0.1, 0.25, 1)";

export type NavIndicatorStyle = {
  left: number;
  top: number;
  width: number;
  height: number;
  opacity: number;
};

function getRectRelativeTo(
  el: Element | null,
  container: Element | null
): NavIndicatorStyle | null {
  if (!el || !container) return null;
  const elRect = el.getBoundingClientRect();
  const contRect = container.getBoundingClientRect();
  return {
    left: elRect.left - contRect.left,
    top: elRect.top - contRect.top,
    width: elRect.width,
    height: elRect.height,
    opacity: 1,
  };
}

export function useNavIndicator(
  containerRef: React.RefObject<HTMLElement | null>,
  activeIndex: number
) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<NavIndicatorStyle>({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    opacity: 0,
  });
  const [blobStyle, setBlobStyle] = useState<NavIndicatorStyle>({
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    opacity: 0,
  });

  const updateRects = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const items = container.querySelectorAll<HTMLElement>("[data-nav-index]");
    if (items.length === 0) return;

    const activeEl = activeIndex >= 0 && activeIndex < items.length ? items[activeIndex] : null;
    const hoveredEl = hoveredIndex !== null && hoveredIndex >= 0 && hoveredIndex < items.length ? items[hoveredIndex] : null;

    const nextIndicator = getRectRelativeTo(activeEl, container);
    const nextBlob = getRectRelativeTo(hoveredEl, container);

    if (nextIndicator) setIndicatorStyle((prev) => ({ ...prev, ...nextIndicator }));
    else setIndicatorStyle((prev) => ({ ...prev, opacity: 0 }));

    if (nextBlob) setBlobStyle((prev) => ({ ...prev, ...nextBlob }));
    else setBlobStyle((prev) => ({ ...prev, opacity: 0 }));
  }, [containerRef, activeIndex, hoveredIndex]);

  useEffect(() => {
    updateRects();
    const container = containerRef.current;
    if (!container) return;
    const ro = new ResizeObserver(updateRects);
    ro.observe(container);
    window.addEventListener("scroll", updateRects, true);
    return () => {
      ro.disconnect();
      window.removeEventListener("scroll", updateRects, true);
    };
  }, [updateRects, containerRef]);

  const transition = `left ${TRANSITION_MS}ms ${EASING}, top ${TRANSITION_MS}ms ${EASING}, width ${TRANSITION_MS}ms ${EASING}, height ${TRANSITION_MS}ms ${EASING}, opacity ${TRANSITION_MS}ms ${EASING}`;

  return {
    indicatorStyle: { ...indicatorStyle, transition },
    blobStyle: { ...blobStyle, transition },
    setHoveredIndex,
  };
}
