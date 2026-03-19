"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function IndustrialShowcasePanel() {
  const rootRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const state = {
      x: 0,
      y: 0,
      targetX: 0,
      targetY: 0,
    };

    const updateTarget = (clientX: number, clientY: number) => {
      const bounds = root.getBoundingClientRect();
      const normalizedX = ((clientX - bounds.left) / bounds.width) * 2 - 1;
      const normalizedY = ((clientY - bounds.top) / bounds.height) * 2 - 1;
      state.targetX = Math.max(-1, Math.min(1, normalizedX));
      state.targetY = Math.max(-1, Math.min(1, normalizedY));
    };

    const onPointerMove = (event: PointerEvent) => {
      updateTarget(event.clientX, event.clientY);
    };

    const onPointerLeave = () => {
      state.targetX = 0;
      state.targetY = 0;
    };

    const tick = () => {
      state.x += (state.targetX - state.x) * 0.08;
      state.y += (state.targetY - state.y) * 0.08;

      root.style.setProperty("--media-shift-x", `${state.x * 18}px`);
      root.style.setProperty("--media-shift-y", `${state.y * 12}px`);
      root.style.setProperty("--mist-shift-x", `${state.x * 22}px`);
      root.style.setProperty("--mist-shift-y", `${state.y * 10}px`);
      root.style.setProperty("--glow-x", `${50 + state.x * 8}%`);
      root.style.setProperty("--glow-y", `${34 + state.y * 8}%`);
    };

    root.addEventListener("pointermove", onPointerMove, { passive: true });
    root.addEventListener("pointerleave", onPointerLeave);
    gsap.ticker.add(tick);

    return () => {
      root.removeEventListener("pointermove", onPointerMove);
      root.removeEventListener("pointerleave", onPointerLeave);
      gsap.ticker.remove(tick);
    };
  }, []);

  return (
    <div className="paint-showcase" ref={rootRef} aria-hidden="true">
      <div className="paint-showcase__halo" />
      <div className="paint-showcase__media">
        <Image
          src="/assets/2149878738.webp"
          alt=""
          fill
          sizes="(max-width: 900px) 100vw, 560px"
          className="paint-showcase__image"
          priority={false}
        />
        <div className="paint-showcase__vignette" />
        <div className="paint-showcase__spray paint-showcase__spray--a" />
        <div className="paint-showcase__spray paint-showcase__spray--b" />
        <div className="paint-showcase__mist paint-showcase__mist--a" />
        <div className="paint-showcase__mist paint-showcase__mist--b" />
        <div className="paint-showcase__sheen" />
      </div>
    </div>
  );
}
