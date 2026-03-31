"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { FACHADA_HERO_IMAGES } from "@/lib/fachada-hero";

const INTERVAL_MS = 5200;
const CLEAR_LEAVING_MS = 920;

type FachadaHeroCarouselProps = {
  /** Texto alternativo comum às fotos da fachada */
  alt: string;
};

export default function FachadaHeroCarousel({ alt }: FachadaHeroCarouselProps) {
  const slides = FACHADA_HERO_IMAGES;
  const [active, setActive] = useState(0);
  const [leaving, setLeaving] = useState<number | null>(null);
  /** Após a primeira troca, a foto 0 volta a usar animação de entrada. */
  const [hasCycled, setHasCycled] = useState(false);

  useEffect(() => {
    if (slides.length < 2) return undefined;
    const id = window.setInterval(() => {
      setHasCycled(true);
      setActive((current) => {
        setLeaving(current);
        return (current + 1) % slides.length;
      });
    }, INTERVAL_MS);
    return () => window.clearInterval(id);
  }, [slides.length]);

  useEffect(() => {
    if (leaving === null) return undefined;
    const t = window.setTimeout(() => setLeaving(null), CLEAR_LEAVING_MS);
    return () => window.clearTimeout(t);
  }, [leaving]);

  return (
    <>
      {slides.map((src, i) => {
        const isActive = i === active;
        const isLeaving = i === leaving && i !== active;
        const instantOnLoad = isActive && i === 0 && !hasCycled;
        let paneClass = "fachada-slide-pane";
        if (instantOnLoad) paneClass += " fachada-slide-pane--instant";
        else if (isActive) paneClass += " fachada-slide-pane--active";
        else if (isLeaving) paneClass += " fachada-slide-pane--leaving";
        else paneClass += " fachada-slide-pane--idle";

        return (
          <div key={src} className={paneClass} aria-hidden={!isActive}>
            <Image
              src={src}
              alt={isActive ? alt : ""}
              fill
              sizes="(max-width: 900px) 100vw, min(1240px, 62vw)"
              className="fachada-slide-pane__img"
              priority={i === 0}
              quality={85}
            />
          </div>
        );
      })}
    </>
  );
}
